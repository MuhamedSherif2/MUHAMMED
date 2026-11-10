import { CoverStatic } from "@/lib/data/Cover"
import { contacts } from '@/lib/StaticData';
import HalftoneReveal from '@/components/HalftoneReveal';
import SplitText from "@/components/SplitText"
import Image from 'next/image';
import Link from "next/link";

function Cover() {
    const { callToAction, name, photo, shortTagline, title } = CoverStatic
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <section className="min-h-[70vh] w-full pt-16 pb-10  bg-[#F8F9FC] dark:bg-[#0F172A]">
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-12'>
                <div className='max-w-2xl'>
                    <h4 className='text-[#4B5563] dark:text-[#94A3B8] text-lg sm:text-xl lg:text-2xl font-medium'>Hi, I am</h4>
                    <h1 className='text-[#111827] dark:text-[#E2E8F0] mt-4 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'>{name}</h1>
                    {/* <SplitText
                        text={title}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold mt-4 text-primary"
                        delay={50}
                        duration={1.25}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                    /> */}
                    <h2 className='text-[#2563EB] dark:text-[#4A7CFE] text-xl sm:text-2xl lg:text-3xl font-bold mt-4'>{title}</h2>
                    <p className='text-[#4B5563] dark:text-[#94A3B8] text-lg sm:text-xl mt-4 font-medium'>{shortTagline}</p>
                    <p className='text-[#7C3AED] dark:text-[#7C3AED] text-lg sm:text-xl mt-2 font-semibold'>{callToAction}</p>

                    <div className='mt-10 flex gap-4'>
                        {contacts.map(item => (
                            <Link href={item.link} key={item.id} target='_blank' className='text-white bg-[#111827] dark:bg-[#1E2235] p-3 rounded-lg hover:bg-[#2563EB] dark:hover:bg-[#4A7CFE] transition-colors duration-300'>
                                <span>{item.icon}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                    {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                        <HalftoneReveal
                            src={photo}
                            mode="mono"
                            shape="dot"
                            cellSize={6}
                            angle={45}
                            inkColor="#f4f1ea"
                            paperColor="#120f17"
                            revealRadius={160}
                            dotScale={1}
                            contrast={1.1}
                            brightness={0}
                            invert={false}
                            roughness={0}
                            misregistration={0}
                            fit="contain"
                            accentColor="#ff4f2a"
                            softness={0.6}
                            linger={1.2}
                            reverse={false}
                            wander={false}
                            clickBurst
                            intro
                        />
                    </div> */}
                    <Image src={photo} alt="Mohamed Sherif, Full-Stack Web Developer" fill priority sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px" className="rounded-full object-cover border-4 border-border shadow-xl" />
                </div>
            </div>
        </section>
    );
}

export default Cover;
