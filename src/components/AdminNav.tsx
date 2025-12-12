import { Link } from "react-router-dom";
import ThemeToggle from "./ToggelMode";

const AdminNav = () => {
    const links = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: 'About', href: '/about' },
        { id: 3, name: 'Skills', href: '/skills' },
        { id: 4, name: 'Projects', href: '/projects' },
        { id: 5, name: 'Contact', href: '/contact' }
      ];
    
      return (
        <header className="bg-[#ffffff] dark:bg-[#0B0E1D] py-4 border-b border-[#F8F9FC] dark:border-[#121629]">
          <nav className="flex justify-between items-center px-6 max-w-7xl mx-auto">
            <ul className="flex space-x-8">
              {links.map((link) => (
                <li key={link.id}>
                  <Link to={link.href} className="text-[#111827] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#4A7CFE] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>
        </header>
      );
}

export default AdminNav