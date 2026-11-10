import Image from "next/image";
import type { ISkills } from "@/interfaces/server";
import { SkillsStatic } from "@/lib/data";

const Skills = () => {
  const skillsByCategory = SkillsStatic.reduce<Record<string, ISkills[]>>(
    (acc, skill) => {
      const name = skill.category.title;
      (acc[name] ??= []).push(skill);
      return acc;
    },
    {}
  );

  return (
    <section className="w-full bg-surface py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <h2 className="border-2 w-fit border-text py-2 px-6 text-xl md:text-2xl font-bold text-text rounded-lg">
            Skills
          </h2>
        </div>

        {Object.entries(skillsByCategory).map(([categoryName, categorySkills]) => (
          <div key={categoryName} className="mt-8">
            <h3 className="text-text text-lg md:text-xl font-bold mb-4">
              {categoryName}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="group p-3 md:p-4 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 text-center hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3">
                    <Image
                      src={skill.image}
                      alt={skill.title}
                      fill
                      sizes="56px"
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-text text-sm md:text-base font-medium">
                    {skill.title}
                  </p>
                  <div className="mt-2 h-1 w-8 mx-auto bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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