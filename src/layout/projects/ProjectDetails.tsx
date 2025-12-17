import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { Context } from "@/context";

function ProjectDetails() {
  const context = useContext(Context);
  if (!context)
    return (
      <div className="text-[#4B5563] dark:text-[#94A3B8] p-8">
        Loading...
      </div>
    );

  const { id } = useParams();

  // ابحث في projects أولاً (هذا هو المتغير المستخدم في الكومبوننت السابق)
  const project = context.projects.find(p => p._id === id)
    || (context.uniqueProjects || []).find(p => p._id === id)
    || null;

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#0B0E1D] p-8">
        <div className="animate-spin h-12 w-12 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full mb-4"></div>
        <p className="text-[#4B5563] dark:text-[#94A3B8]">
          {id ? `Project with ID "${id}" not found` : "No project ID provided"}
        </p>
      </div>
    );
  }

  const splitTextIntoPoints = (text: string) => {
    if (!text) return [];

    const separators = ['\n', '. ', '- ', '• ', '* ', '✓ '];

    for (const separator of separators) {
      if (text.includes(separator)) {
        return text.split(separator)
          .map(point => point.trim())
          .filter(point => point.length > 0);
      }
    }

    const points = text.split(/(?=\d+\.)/).filter(p => p.trim());
    if (points.length > 1) return points.map(p => p.trim());

    return [text];
  };

  const features = splitTextIntoPoints(project.keyFeatures);
  const highlights = splitTextIntoPoints(project.highlights);

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

          {/* Title & Badges */}
          <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] dark:text-[#E2E8F0]">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-block bg-[#2563EB] dark:bg-[#4A7CFE] text-white text-xs px-3 py-1 rounded-full">
                  {project.projectType || "Project"}
                </span>
              </div>
            </div>
          </div>

          {/* Overview */}
          {project.overview && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E2E8F0] mb-3">Overview</h3>
              <div className="bg-white dark:bg-[#1E2235] p-4 rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed">{project.overview}</p>
              </div>
            </div>
          )}

          {/* Key Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E2E8F0] mb-3">Key Features</h3>
              <div className="bg-white dark:bg-[#1E2235] p-4 rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#2563EB] dark:text-[#4A7CFE] mr-3 mt-1 shrink-0">•</span>
                      <span className="text-[#4B5563] dark:text-[#94A3B8]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E2E8F0] mb-3">Highlights</h3>
              <div className="bg-white dark:bg-[#1E2235] p-4 rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#10B981] dark:text-[#34D399] mr-3 mt-1 shrink-0">✓</span>
                      <span className="text-[#4B5563] dark:text-[#94A3B8]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Category */}
          {project.category && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Project Field
              </h3>
              <span className="inline-block bg-linear-to-r from-[#2563EB] to-[#1D4ED8] dark:from-[#4A7CFE] dark:to-[#3B82F6] text-white text-sm px-4 py-2 rounded-full shadow-md">
                {project.category.title}
              </span>
            </div>
          )}

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E2E8F0] mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Live Demo */}
            {project.demo && (
              <div className="flex-1">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <button className="w-full flex items-center justify-center gap-3 bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Visit
                  </button>
                </a>
              </div>
            )}

            {/* Frontend Code */}
            {project.githubFront && (
              <div className="flex-1">
                <a href={project.githubFront} target="_blank" rel="noopener noreferrer">
                  <button className="w-full flex items-center justify-center gap-3 bg-[#059669] dark:bg-[#10B981] hover:bg-[#047857] dark:hover:bg-[#0D9C6F] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                    <FaCode className="w-4 h-4" />
                    View
                  </button>
                </a>
              </div>
            )}

            {/* Backend Code */}
            {project.githubBack && (
              <div className="flex-1">
                <a href={project.githubBack} target="_blank" rel="noopener noreferrer">
                  <button className="w-full flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                    <FaCode className="w-4 h-4" />
                    View
                  </button>
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;