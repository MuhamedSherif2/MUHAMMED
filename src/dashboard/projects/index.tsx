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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white dark:bg-[#1E2235] p-4 rounded-xl shadow-md border dark:border-[#121629]">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => { setSelectedProject(project); setIsFormOpen(true); }}>Update Project</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)}>Delete</Button>
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
