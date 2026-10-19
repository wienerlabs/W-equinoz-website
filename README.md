# Equinoz website

The site of Equinoz LLC, a Dubai-based advisory firm with four brands under one roof: Equinoz Global, Equinoz Consulting, Equinoz Accounting and Equinoz Education. Turkish is served at the root, English under `/en`.

Built with Next.js 16, Tailwind CSS 4, GSAP and Lenis. The equinox story (logo doors, the sun on the horizon, four lights of the day) runs on a small WebGL stage in `lib/stage.ts`, with plain images as the fallback.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```

## Content

All copy lives in `lib/content`, Turkish and English side by side, so every page exists in both languages. Team members and partners appear on the site only when their data is complete: add the approved name, photo, bio or logo in `lib/content/people.ts`, then set `published: true`. The partners page and its links switch on by themselves once one partner is published.

## Contact form

`POST /api/contact` emails each request through Resend when these variables are set in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`, one or more addresses separated by commas
- `CONTACT_FROM_EMAIL`, a verified sender such as `Equinoz Web <web@equinoz.com>`

The email names the requested service and the page the visitor came from. Until the variables are set, the form offers the same request as a prefilled WhatsApp or email message, so nothing the visitor typed is lost.

## Photography

Dubai photographs from Pexels, used under the Pexels license:

| File | Pexels photo |
| --- | --- |
| hero-horizon | 27990771 |
| global-sunset | 36260007 |
| consulting-morning | 33678824 |
| accounting-noon | 39917763 |
| education-dawn | 7814473 |
| night-downtown | 13256066 |
| night-panorama | 16204528 |
| dusk-burj | 19180974 |
| family-office | 10514386 |
| structuring | 29470840 |
| trade-creek | 35132523 |
| real-estate | 29763203 |
| technology | 32690046 |

Each photo is at `https://www.pexels.com/photo/<id>/`.
