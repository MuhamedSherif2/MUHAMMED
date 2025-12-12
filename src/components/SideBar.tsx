import { NavLink } from "react-router-dom";
import { Home, User, Award, FolderOpen, Briefcase, Settings, Code, MessageSquare, TrendingUp } from "lucide-react";
import ThemeToggle from "./ToggelMode";

const links = [
    { id: 1, page: 'Dashboard', link: '/admin', icon: <Home size={20} /> },
    { id: 2, page: 'About Me', link: '/admin/aboutme', icon: <User size={20} /> },
    { id: 3, page: 'Certification', link: '/admin/certification', icon: <Award size={20} /> },
    { id: 4, page: 'Categories', link: '/admin/categories', icon: <FolderOpen size={20} /> },
    { id: 5, page: 'Projects', link: '/admin/projects', icon: <Briefcase size={20} /> },
    { id: 6, page: 'Services', link: '/admin/services', icon: <Settings size={20} /> },
    { id: 7, page: 'Skills', link: '/admin/skills', icon: <Code size={20} /> },
    { id: 8, page: 'Testimonials', link: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { id: 9, page: 'Work Experience', link: '/admin/experiences', icon: <TrendingUp size={20} /> },
    { id: 10, page: 'Home', link: '/', icon: <Home size={20} /> },
];

const SideBar = () => {
    return (
        <aside className="w-64 bg-[#0B0E1D] dark:bg-[#0B0E1D] text-[#E2E8F0] min-h-screen p-6 border-r border-[#121629]">
            <div className="mb-10">
                <h2 className="text-xl font-bold text-[#E2E8F0]">Admin Panel</h2>
                <p className="text-sm text-[#94A3B8] mt-2">Dashboard</p>
            </div>

            <nav className="space-y-2">
                {links.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.link}
                        end={item.link === '/admin'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-[#1E2235] text-[#4A7CFE] border-l-4 border-[#4A7CFE] pl-2.5'
                                : 'hover:bg-[#121629] text-[#94A3B8] hover:text-[#E2E8F0]'
                            }`
                        }
                    >
                        <span className={`${item.link === '/' ? 'text-[#7C3AED]' : ''}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.page}</span>
                    </NavLink>
                ))}

                <div className="pt-6 mt-6 border-t border-[#121629]">
                    <ThemeToggle />
                </div>
            </nav>

            <div className="mt-10 p-4 bg-[#121629] rounded-lg">
                <p className="text-sm text-[#94A3B8]">Current Status</p>
                <p className="font-medium text-[#E2E8F0] mt-1">Active</p>
            </div>
        </aside>
    );
};

export default SideBar;