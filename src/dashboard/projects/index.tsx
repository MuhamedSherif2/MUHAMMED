// src/dashboard/projects/index.tsx
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormProject from "./FormProject";
import { Context } from "@/context";
import type { IProject } from "@/interfaces/server";

const Projects = () => {
  const ctx = useContext(Context);
  if (!ctx) return null;

  const { projects, setProjects, userToken, portfolioActions } = ctx;
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await portfolioActions.loadProjects?.();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!userToken) return alert("You must be logged in");
    if (!confirm("Delete this project?")) return;

    try {
      await portfolioActions.deleteExistingProject(id, userToken);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!userToken) return alert("You must be logged in");

    try {
      if (selectedProject) {
        await portfolioActions.updateExistingProject(selectedProject._id, userToken, formData);
      } else {
        await portfolioActions.addNewProject(userToken, formData);
      }

      await portfolioActions.loadProjects?.();
      setIsFormOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#111827] dark:text-[#E2E8F0]">Projects</h2>
        <Button onClick={() => { setSelectedProject(null); setIsFormOpen(true); }}>Add Project</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-gray-500">No projects added yet</p>
          <Button className="mt-4" onClick={() => setIsFormOpen(true)}>Add Project</Button>
        </div>
      ) : (
        <div className="space-y-6"> {/* ⬅️ تغيير من grid إلى space-y-6 */}
          {projects.map(project => (
            <div key={project._id} className="bg-white dark:bg-[#1E2235] p-6 rounded-xl shadow-md border dark:border-[#121629]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* ⬅️ grid داخل الـ card */}
                {/* الصورة */}
                <div className="lg:col-span-1">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* المحتوى */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-[#111827] dark:text-[#E2E8F0]">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                            {project.projectType}
                          </span>
                          {project.hot && (
                            <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => { setSelectedProject(project); setIsFormOpen(true); }}>
                          Update
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-[#E2E8F0] mb-1">Overview</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {truncateText(project.overview || "No overview provided", 200)}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-[#E2E8F0] mb-1">Key Features</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {truncateText(project.keyFeatures || "No features provided", 150)}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-[#E2E8F0] mb-1">Highlights</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {truncateText(project.highlights || "No highlights provided", 150)}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.length ? (
                      project.skills.map(skill => (
                        <span
                          key={skill._id}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
                        >
                          {skill.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No skills added</span>
                    )}
                  </div>



                  {/* Links */}
                  {(project.githubFront || project.githubBack || project.demo) && (
                    <div>
                      <h4 className="font-semibold text-[#111827] dark:text-[#E2E8F0] mb-1">Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.githubFront && (
                          <a
                            href={project.githubFront}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub Front
                          </a>
                        )}
                        {project.githubBack && (
                          <a
                            href={project.githubBack}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub Back
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-green-600 dark:text-green-400 hover:underline"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <FormProject
          project={selectedProject || undefined}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
};

export default Projects;