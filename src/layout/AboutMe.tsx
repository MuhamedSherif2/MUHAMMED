import Loading from '@/components/Loading';
import { Context } from '../context';
import { useContext, useEffect, useState } from "react"

const AboutMe = () => {
  const context = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (context && !context.aboutMe) {
        await context.portfolioActions.loadAboutMe();
      }
      setLoading(false);
    }
    loadData();
  }, [context]);
  
  if (loading || !context) return <Loading />;
  
  const { aboutMe } = context;
  
  return (
    <section className='bg-[#ffffff] dark:bg-[#0B0E1D] w-full py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-12'>
          <h1 className='border-2 w-fit border-[#111827] dark:border-[#E2E8F0] text-[#111827] dark:text-[#E2E8F0] py-3 px-6 text-2xl font-bold rounded-lg'>
            About Me
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F8F9FC] dark:bg-[#121629] p-8 rounded-xl shadow-sm mb-8">
              <h3 className='text-[#111827] dark:text-[#E2E8F0] text-xl font-semibold mb-6 leading-relaxed'>
                {aboutMe?.experience}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-4 text-[#111827] dark:text-[#E2E8F0]">
                  What makes me unique:
                </h4>
                <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed">
                  {aboutMe?.uniquePoint}
                </p>
              </div>
              
              <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-4 text-[#111827] dark:text-[#E2E8F0]">
                  Career Goals:
                </h4>
                <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed">
                  {aboutMe?.careerGoals}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
