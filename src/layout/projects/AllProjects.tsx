import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban, Search } from 'lucide-react';

const AllProjects = () => {
  const context = useContext(Context);
  if (!context) return null;
  const { setSelectProject, projects, portfolioActions } = context;
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.skills?.some(skill => skill.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!context || loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-gray-50 to-white dark:from-[#0B0E1D] dark:to-[#0F172A]">
        <div className="relative">
          <div className="animate-spin h-20 w-20 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
          <div className="absolute top-0 left-0 animate-spin h-20 w-20 border-4 border-[#2563EB] dark:border-[#4A7CFE] border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading projects...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-gray-50 to-white dark:from-[#0B0E1D] dark:to-[#0F172A] p-4 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <FolderKanban className="w-4 h-4 text-[#2563EB] dark:text-[#4A7CFE]" />
                <span className="text-sm font-medium text-[#2563EB] dark:text-[#4A7CFE]">Portfolio</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text">
                All Projects
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Explore my complete portfolio of work, from web applications to innovative solutions
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, category, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <Link
                to={`/projects/${project._id}`}
                onClick={() => setSelectProject(project._id)}
                key={project._id}
                className="group block"
              >
                <div className="h-full bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      {project.category?.title && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-[#4A7CFE] text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-800/30">
                          {project.category.title}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors mb-4 line-clamp-2">
                      {project.title}
                    </h4>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills?.length ? (
                        project.skills.map(skill => (
                          <span
                            key={skill._id}
                            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 group-hover:border-[#2563EB]/20 dark:group-hover:border-[#4A7CFE]/30 transition-colors"
                          >
                            {skill.title}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">No skills added</span>
                      )}
                    </div>

                    {/* View Project Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-sm font-medium text-[#2563EB] dark:text-[#4A7CFE] group-hover:underline">
                        View Project
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-all duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FolderKanban className="w-10 h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {searchTerm ? 'No matching projects' : 'No projects yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              {searchTerm 
                ? `No projects found for "${searchTerm}". Try a different search term.`
                : 'Projects will appear here once they are added to the portfolio.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center gap-2 bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProjects;