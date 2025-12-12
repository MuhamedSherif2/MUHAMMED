import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiVercelFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function Footer() {
  const contact = [
    {
      id: 1,
      link: 'https://github.com/MuhamedSherif2',
      icon: <FaGithub className="w-6 h-6" />,
      name: 'GitHub'
    },
    {
      id: 2,
      link: 'https://www.linkedin.com/in/muhamed-sherif',
      icon: <FaLinkedin className="w-6 h-6" />,
      name: 'LinkedIn'
    },
    {
      id: 3,
      link: 'https://wa.me/qr/R4XJZ2JK2M76K1',
      icon: <FaWhatsapp className="w-6 h-6" />,
      name: 'WhatsApp'
    },
    {
      id: 4,
      link: 'mailto:muhamedsherif2612@gmail.com',
      icon: <MdEmail className="w-6 h-6" />,
      name: 'Email'
    },
    {
      id: 5,
      link: 'https://vercel.com/mohamed-sherifs-projects-147e3199',
      icon: <RiVercelFill className="w-6 h-6" />,
      name: 'Vercel'
    },
  ];
  
  return (
    <footer className='bg-white dark:bg-[#0B0E1D] py-12 border-t border-[#F8F9FC] dark:border-[#121629]'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10'>
          {contact.map((link) => (
            <div key={link.id}>
              <a 
                href={link.link} 
                target="_blank"
                rel="noopener noreferrer"
                className='text-[#111827] dark:text-[#E2E8F0] flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 rounded-xl bg-[#F8F9FC] dark:bg-[#121629] hover:bg-white dark:hover:bg-[#1E2235] hover:text-[#2563EB] dark:hover:text-[#4A7CFE] transition-all duration-300 border border-[#F8F9FC] dark:border-[#121629] hover:border-[#2563EB]/30 dark:hover:border-[#4A7CFE]/30 hover:scale-105 group'
              >
                <span className='text-2xl mb-2 group-hover:scale-110 transition-transform'>
                  {link.icon}
                </span>
                <p className="text-xs sm:text-sm font-medium">{link.name}</p>
              </a>
            </div>
          ))}
        </div>

        <div className='w-full h-px bg-[#F8F9FC] dark:bg-[#121629] my-8'></div>
        
        <div className='text-center'>
          <h4 className='text-[#4B5563] dark:text-[#94A3B8] text-sm sm:text-base'>
            © <span className="text-[#111827] dark:text-[#E2E8F0] font-semibold">MOHAMMED</span> 2025 • Built With React & TypeScript
          </h4>
          <p className="text-[#4B5563] dark:text-[#94A3B8] text-xs sm:text-sm mt-2">
            Full Stack Developer • Modern Web Applications
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
