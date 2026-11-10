import { FaGithubSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiVercelFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export const contacts = [
    { id: 1, link: 'https://www.linkedin.com/in/muhamed-mern', icon: <FaLinkedin className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
    { id: 2, link: 'https://github.com/MuhamedSherif2', icon: <FaGithubSquare className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
    { id: 3, link: 'https://vercel.com/mohamed-sherifs-projects-147e3199', icon: <RiVercelFill className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
];

export const links = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Certification', href: '/certification' },
    { id: 3, name: 'Experience', href: '/experience' },
    { id: 4, name: 'Projects', href: '/projects' },
    // { id: 5, name: 'Contact', href: '/contact' }
];

export const contact = [
    { id: 1, link: 'https://github.com/MuhamedSherif2', icon: <FaGithub className="w-6 h-6" />, name: 'GitHub' },
    { id: 2, link: 'https://www.linkedin.com/in/muhamed-sherif', icon: <FaLinkedin className="w-6 h-6" />, name: 'LinkedIn' },
    { id: 3, link: 'https://wa.me/qr/R4XJZ2JK2M76K1', icon: <FaWhatsapp className="w-6 h-6" />, name: 'WhatsApp' },
    { id: 4, link: 'mailto:muhamedsherif2612@gmail.com', icon: <MdEmail className="w-6 h-6" />, name: 'Email' },
    { id: 5, link: 'https://vercel.com/mohamed-sherifs-projects-147e3199', icon: <RiVercelFill className="w-6 h-6" />, name: 'Vercel' },
];
