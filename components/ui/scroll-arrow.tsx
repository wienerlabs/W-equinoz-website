'use client'

interface ScrollArrowProps {
  targetId: string
  className?: string
}

export default function ScrollArrow({ targetId, className = '' }: ScrollArrowProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToSection}
      className={`group flex items-center justify-center ${className}`}
      aria-label={`Scroll to ${targetId}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-terracotta/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
        <div className="relative w-14 h-14 rounded-full border-2 border-terracotta/40 group-hover:border-terracotta flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white/50 backdrop-blur-sm">
          <svg
            className="w-6 h-6 text-terracotta animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </button>
  )
}

