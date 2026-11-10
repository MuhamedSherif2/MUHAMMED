import { AboutMeStatic } from "@/lib/data";

const AboutMe = () => {
  const { experience, uniquePoint, careerGoals } = AboutMeStatic;

  return (
    <section className="bg-background w-full py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          <h2 className="border-2 w-fit border-text text-text py-3 px-6 text-2xl font-bold rounded-lg">
            About Me
          </h2>

          <div className="mx-auto">
            <div className="bg-surface p-8 rounded-xl shadow-sm mb-8">
              <p className="text-text text-xl font-semibold leading-relaxed">
                {experience}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4 text-text">
                  What makes me unique:
                </h3>
                <p className="text-muted leading-relaxed">{uniquePoint}</p>
              </div>

              <div className="bg-surface p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4 text-text">
                  Career Goals:
                </h3>
                <p className="text-muted leading-relaxed">{careerGoals}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;