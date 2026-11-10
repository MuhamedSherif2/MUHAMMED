"use client";

import { useMemo, useState } from "react";
import { FolderKanban, Search } from "lucide-react";
import { ProjectStatic, getSkillsByIds } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return ProjectStatic;

    return ProjectStatic.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.title.toLowerCase().includes(term) ||
        getSkillsByIds(p.skills).some((s) => s.title.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  return (
    <section className="min-h-screen w-full bg-background p-4 md:p-8 lg:p-12">
      <div className="container mx-auto">
        <div className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-surface border border-border">
            <FolderKanban className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Portfolio</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">
            All Projects
          </h1>
          <p className="text-lg text-muted max-w-2xl mb-8">
            Explore my complete portfolio of work, from web applications to full-stack platforms.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search by title, category, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text placeholder:text-muted shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
              No matching projects
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Nothing found for &quot;{searchTerm}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;