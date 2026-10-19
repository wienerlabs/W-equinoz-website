import { brands } from '@/lib/content/brands'
import { ui } from '@/lib/content/ui'
import type { L, Lang } from '@/lib/i18n'

export type ServiceOption = { value: string; label: L }
export type ServiceGroup = { label: string; options: ServiceOption[] }

export const OTHER_SERVICE = 'other'

export const serviceGroups: ServiceGroup[] = brands.map((brand) => ({
  label: brand.name,
  options: [
    {
      value: brand.key,
      label: { tr: `${brand.name}: genel görüşme`, en: `${brand.name}: general enquiry` },
    },
    ...brand.services.map((service, index) => ({
      value: service.route ?? `${brand.key}-${index + 1}`,
      label: service.title,
    })),
  ],
}))

export const serviceValues = [...serviceGroups.flatMap((group) => group.options.map((option) => option.value)), OTHER_SERVICE]

export function serviceLabel(value: string, lang: Lang): string {
  if (value === OTHER_SERVICE) return ui.form.otherService[lang]
  for (const group of serviceGroups) {
    const option = group.options.find((item) => item.value === value)
    if (option) return group.options[0] === option ? option.label[lang] : `${group.label} / ${option.label[lang]}`
  }
  return value
}
