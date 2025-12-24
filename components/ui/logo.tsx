import Link from 'next/link'

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="EQUINOZ">
      <span className={`text-xl font-bold tracking-wider ${variant === 'light' ? 'text-white' : 'text-[#0E2725]'}`}>
        EQUIN<span className="text-terracotta">O</span>Z
      </span>
    </Link>
  )
}
