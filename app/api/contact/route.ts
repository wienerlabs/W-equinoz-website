import { composeMessage, validateContact } from '@/lib/contact'
import { serviceLabel, serviceValues } from '@/lib/content/options'

const MAX_BODY = 20_000

async function readCapped(request: Request): Promise<string | null> {
  const reader = request.body?.getReader()
  if (!reader) return ''
  const chunks: Uint8Array[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BODY) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const sameOrigin = (request: Request) => {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).host === new URL(request.url).host
  } catch {
    return false
  }
}

const pathOf = (source: string) => {
  try {
    return new URL(source).pathname
  } catch {
    return 'unknown'
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ ok: false }, { status: 403 })
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) {
    return Response.json({ ok: false }, { status: 413 })
  }
  const raw = await readCapped(request)
  if (raw === null) return Response.json({ ok: false }, { status: 413 })
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  const result = validateContact(body, serviceValues)
  if (!result.ok) {
    if (result.spam) return Response.json({ ok: true })
    return Response.json({ ok: false, errors: result.errors }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!key || !to || !from) {
    return Response.json({ ok: false, reason: 'unconfigured' }, { status: 503 })
  }

  const label = serviceLabel(result.data.service, 'tr')
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((address) => address.trim()),
        reply_to: result.data.email,
        subject: `Equinoz web talebi: ${label} (${pathOf(result.data.source)})`,
        text: composeMessage(result.data, label, 'tr'),
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      console.error('contact delivery failed', response.status)
      return Response.json({ ok: false, reason: 'delivery' }, { status: 502 })
    }
  } catch (error) {
    console.error('contact delivery error', error)
    return Response.json({ ok: false, reason: 'delivery' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
