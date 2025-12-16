import { useEffect, useContext, useState } from "react";
import { Context } from "@/context";
import { Briefcase, Building, FileText, ExternalLink } from "lucide-react";

const WorkExperience = () => {
  const context = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context) return;

    const loadData = async () => {
      try {
        // لو الداتا لسه محملتش
        if (!context.workExperince) {
          await context.portfolioActions.loadWorkExperince?.();
        }
      } catch (error) {
        console.error("Failed to load work experience:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Spinner أثناء التحميل
  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin h-12 w-12 border-2 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  const { workExperince } = context;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <section className="w-full bg-white dark:bg-gray-900 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Professional journey and career milestones
          </p>
        </div>

        {/* ====== في حالة وجود بيانات ====== */}
        {Array.isArray(workExperince) && workExperince.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workExperince.map((exp) => (
              <div
                key={exp._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {exp.certificate && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={exp.certificate}
                      alt={exp.organization}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {exp.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building className="w-4 h-4" />
                      <span>{exp.organization}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {exp.description}
                  </p>

                  {exp.certificate && (
                    <a
                      href={exp.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Briefcase className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Work Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work experience will appear here once it is added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;