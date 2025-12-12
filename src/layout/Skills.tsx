import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";
import type { ISkills } from "@/interfaces/server";

const Skills = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (context && !context.skills?.length) {
        try {
          await context.portfolioActions.loadSkills?.();
        } catch (err) {
          console.error("Failed to load skills:", err);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [context]);

  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  const skills: ISkills[] = context.skills || [];

  // تجميع المهارات حسب الكاتيجوري
  const skillsByCategory: Record<string, ISkills[]> = {};
  skills.forEach(skill => {
    const categoryName = skill.category?.title || "Uncategorized";
    if (!skillsByCategory[categoryName]) {
      skillsByCategory[categoryName] = [];
    }
    skillsByCategory[categoryName].push(skill);
  });

  return (
    <section className='w-full bg-[#F8F9FC] dark:bg-[#0F172A] py-8 md:py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-8'>
          <h1 className='border-2 w-fit border-[#111827] dark:border-[#E2E8F0] py-2 px-6 text-xl md:text-2xl font-bold text-[#111827] dark:text-[#E2E8F0] rounded-lg'>
            Skills
          </h1>
        </div>

        {Object.entries(skillsByCategory).map(([categoryName, categorySkills]) => (
          <div key={categoryName} className='mt-8'>
            <h1 className='text-[#111827] dark:text-[#E2E8F0] text-lg md:text-xl font-bold mb-4'>
              {categoryName}:
            </h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
              {categorySkills.map(skill => (
                <div 
                  key={skill._id} 
                  className="group p-3 md:p-4 bg-white dark:bg-[#121629] rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 text-center font-medium hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative">
                    {skill.image && (
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 flex items-center justify-center">
                        <img 
                          src={skill.image} 
                          alt={skill.title} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/20 dark:to-black/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                  </div>
                  <p className="text-[#111827] dark:text-[#E2E8F0] text-sm md:text-base font-medium">
                    {skill.title}
                  </p>
                  <div className="mt-2 h-1 w-8 mx-auto bg-[#2563EB] dark:bg-[#4A7CFE] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;