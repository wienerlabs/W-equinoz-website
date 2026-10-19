import type { Brand } from '@/lib/content/brands'
import { ui } from '@/lib/content/ui'
import type { Lang } from '@/lib/i18n'

export default function LightLabel({ brand, lang }: { brand: Brand; lang: Lang }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: brand.light.glow, boxShadow: `0 0 16px 4px ${brand.light.glow}66` }}
      />
      <span style={{ color: brand.light.glow }}>
        {brand.light.name[lang]} · {brand.light.time}
      </span>
      <span className="text-clay/80">{brand.name}</span>
      <span className="text-clay/55">{ui.byEquinoz}</span>
    </span>
  )
}
