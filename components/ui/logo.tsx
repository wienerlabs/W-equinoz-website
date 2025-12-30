import Link from 'next/link'
import Image from 'next/image'

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="EQUINOZ">
      <Image
        src="/images/logo1.png"
        alt="EQUINOZ"
        width={840}
        height={240}
        className={`h-48 w-auto ${variant === 'dark' ? 'brightness-0' : ''}`}
        priority
      />
    </Link>
  )
}
