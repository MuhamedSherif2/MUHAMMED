import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { Context } from "@/context";

function ProjectDetails() {
  const context = useContext(Context);
  if (!context) return <div className="text-[#4B5563] dark:text-[#94A3B8] p-8">Loading...</div>;

  const { id } = useParams();
  const project = context.uniqueProjects.find(p => p._id === id) || null;

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0B0E1D]">
        <div className="animate-spin h-12 w-12 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-[#0B0E1D] w-full min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Project Image */}
        <div className="mb-8 rounded-xl overflow-hidden border border-[#F8F9FC] dark:border-[#121629] shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
          />
        </div>

        {/* Project Content */}
        <div className="bg-[#F8F9FC] dark:bg-[#121629] rounded-xl p-6 md:p-8 border border-[#F8F9FC] dark:border-[#121629]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#111827] dark:text-[#E2E8F0]">
            {project.title}
          </h1>
          
          <p className="mb-6 text-[#4B5563] dark:text-[#94A3B8] leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Category */}
          {project.categoryDetails && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E2E8F0] mb-2">
                Category
              </h3>
              <span className="inline-block bg-[#2563EB] dark:bg-[#4A7CFE] text-white text-sm px-4 py-2 rounded-full">
                {project.categoryDetails.title}
              </span>
            </div>
          )}

          {/* Skills */}
          {project.skillDetails && project.skillDetails.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E2E8F0] mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skillDetails.map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-[#D1E9FF] dark:bg-[#1E2235] text-[#2563EB] dark:text-[#4A7CFE] text-sm px-3 py-1.5 rounded-lg border border-[#2563EB]/20 dark:border-[#4A7CFE]/20"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full flex items-center justify-center gap-3 bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                <FaExternalLinkAlt className="w-4 h-4" />
                Live Demo
              </button>
            </a>
            
            <a 
              href={project.githubFront} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full flex items-center justify-center gap-3 bg-[#059669] dark:bg-[#10B981] hover:bg-[#047857] dark:hover:bg-[#0D9C6F] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                <FaCode className="w-4 h-4" />
                Frontend Code
              </button>
            </a>
            
            {project.githubBack && (
              <a 
                href={project.githubBack} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                  <FaCode className="w-4 h-4" />
                  Backend Code
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;