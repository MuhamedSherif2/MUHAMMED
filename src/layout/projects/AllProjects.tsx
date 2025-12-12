import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AllProjects = () => {
  const context = useContext(Context);
  if (!context) return null;
  const { setSelectProject, projects, portfolioActions } = context;
  const [loading, setLoading] = useState(true);

  // Load projects أول ما الصفحة تفتح
  useEffect(() => {
    const loadData = async () => {
      if (projects.length === 0) {
        try {
          await portfolioActions.loadProjects();
        } catch (err) {
          console.error("Failed to load projects:", err);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [context]);

  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-white dark:bg-[#0B0E1D] p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-6">
          All Projects
        </h1>

        {context.projects && context.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {context.projects.map((project) => (
              <Link
                to={`/projects/${project._id}`}
                onClick={() => setSelectProject(project._id)}
                key={project._id}
                className="group block"
              >
                <div className="bg-white dark:bg-[#1E2235] rounded-xl border border-gray-200 dark:border-[#121629] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Project Image */}
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    {project.categoryDetails?.title && (
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#121629] text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full mb-3">
                        {project.categoryDetails.title}
                      </span>
                    )}

                    {/* Title with arrow */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-[#111827] dark:text-[#E2E8F0] group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors line-clamp-1">
                        {project.title}
                      </h4>
                      <ArrowRight className="w-4 h-4 text-[#4B5563] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">No projects found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;