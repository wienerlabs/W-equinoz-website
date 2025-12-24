import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function Header({ mode = 'dark' }: { mode?: 'dark' | 'light' }) {
  const isLight = mode === 'light'
  const linkClass = isLight
    ? 'font-medium text-white/80 hover:text-white'
    : 'font-medium text-slate-700 hover:text-[#b55d3b]'

  return (
    <header className={`absolute w-full z-30 ${!isLight && 'dark'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="shrink-0 mr-4">
            <Logo variant={isLight ? 'light' : 'dark'} />
          </div>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center gap-1">
              <li>
                <a href="#about" className={`${linkClass} px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}>About</a>
              </li>
              <li>
                <a href="#services" className={`${linkClass} px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}>Services</a>
              </li>
              <li>
                <a href="#team" className={`${linkClass} px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}>Team</a>
              </li>
              <li>
                <a href="#contact" className={`${linkClass} px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}>Contact</a>
              </li>
            </ul>

            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="#contact"
                  className={`font-semibold ${isLight ? 'bg-[#b55d3b] text-white hover:bg-[#944a2e]' : 'bg-[#0E2725] text-white hover:bg-[#1a3d3a]'} px-5 py-2 rounded-md flex items-center transition duration-150 ease-in-out group`}
                >
                  Start the Conversation
                  <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">→</span>
                </a>
              </li>
            </ul>
          </nav>

          <MobileMenu mode={mode} />
        </div>
      </div>
    </header>
  )
}
