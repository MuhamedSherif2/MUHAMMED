import { Link } from 'react-router-dom';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiVercelFill } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context';
import Loading from '@/components/Loading';

function Cover() {
    const context = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (context && !context.cover) {
                await context.portfolioActions.loadCover();
            }
            setLoading(false);
        };
        loadData();
    }, [context]);

    if (loading || !context) return <Loading />;

    const { cover } = context;

    const contacts = [
        { id: 1, link: 'https://www.linkedin.com/in/muhamed-mern', icon: <FaLinkedin className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
        { id: 2, link: 'https://github.com/MuhamedSherif2', icon: <FaGithubSquare className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
        { id: 3, link: 'https://vercel.com/mohamed-sherifs-projects-147e3199', icon: <RiVercelFill className='rounded w-7 h-7 sm:w-8 sm:h-8' /> },
    ];

    return (
        <section className="min-h-[70vh] w-full pt-16 pb-10  bg-[#F8F9FC] dark:bg-[#0F172A]">
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-12'>
                <div className='max-w-2xl'>
                    <h4 className='text-[#4B5563] dark:text-[#94A3B8] text-lg sm:text-xl lg:text-2xl font-medium'>Hi, I am</h4>
                    <h1 className='text-[#111827] dark:text-[#E2E8F0] mt-4 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'>{cover?.name}</h1>
                    <h2 className='text-[#2563EB] dark:text-[#4A7CFE] text-xl sm:text-2xl lg:text-3xl font-bold mt-4'>{cover?.title}</h2>
                    <p className='text-[#4B5563] dark:text-[#94A3B8] text-lg sm:text-xl mt-4 font-medium'>{cover?.shortTagline}</p>
                    <p className='text-[#7C3AED] dark:text-[#7C3AED] text-lg sm:text-xl mt-2 font-semibold'>{cover?.callToAction}</p>

                    <div className='mt-10 flex gap-4'>
                        {contacts.map(item => (
                            <Link to={item.link} key={item.id} target='_blank' className='text-white bg-[#111827] dark:bg-[#1E2235] p-3 rounded-lg hover:bg-[#2563EB] dark:hover:bg-[#4A7CFE] transition-colors duration-300'>
                                <span>{item.icon}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex justify-center'>
                    {cover?.photo ? (
                        <img src={cover.photo} alt='Profile' className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-[#F8F9FC] dark:border-[#121629] shadow-xl' />
                    ) : (
                        <div className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-[#F8F9FC] dark:bg-[#121629] flex items-center justify-center border-4 border-[#F8F9FC] dark:border-[#121629] shadow-xl'>
                            <span className='text-[#4B5563] dark:text-[#94A3B8] text-lg'>Add Photo</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Cover;
