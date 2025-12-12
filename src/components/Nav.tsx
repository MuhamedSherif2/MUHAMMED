import { Link } from "react-router-dom";
import ThemeToggle from "./ToggelMode";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Certification', href: '/certification' },
    { id: 3, name: 'Experience', href: '/experience' },
    { id: 4, name: 'Projects', href: '/projects' },
    { id: 5, name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white dark:bg-[#0B0E1D] py-3 sm:py-4 border-b border-[#F8F9FC] dark:border-[#121629] sticky top-0 z-50">
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8 container mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src='/real-logo.png' alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <ul className="flex space-x-6 lg:space-x-8 items-center">
            {links.map((link) => (
              <li key={link.id}>
                <Link 
                  to={link.href} 
                  className="text-sm lg:text-base text-[#111827] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#4A7CFE] transition-colors font-medium px-2 py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#111827] dark:text-[#E2E8F0] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0E1D] border-t border-[#F8F9FC] dark:border-[#121629]">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className="block py-3 text-base text-[#111827] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#4A7CFE] transition-colors font-medium border-b border-[#F8F9FC] dark:border-[#121629] last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;