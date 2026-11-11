"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProjectStatic, getSkillsByIds } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  ...Array.from(new Set(ProjectStatic.map((p) => p.category.title))),
];

const countFor = (cat: string) =>
  cat === "All"
    ? ProjectStatic.length
    : ProjectStatic.filter((p) => p.category.title === cat).length;

const sortedProjects = [...ProjectStatic].sort(
  (a, b) => Number(b.hot) - Number(a.hot)
);

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return sortedProjects.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category.title === activeCategory;

      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.category.title.toLowerCase().includes(term) ||
        getSkillsByIds(p.skills).some((s) =>
          s.title.toLowerCase().includes(term)
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    <section className="min-h-screen w-full bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border bg-surface">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />

        <div className="container relative mx-auto px-4 py-14 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
            All{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Explore my complete portfolio, from front-end apps to full-stack platforms.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search by title, category, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-11 py-3.5 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text placeholder:text-muted shadow-sm"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X />
              </Button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <Button
                  key={cat}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className="rounded-full px-4 h-9"
                >
                  {cat}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-surface"
                      }`}
                  >
                    {countFor(cat)}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <p className="text-sm text-muted mb-6">
          Showing {filteredProjects.length} of {ProjectStatic.length} projects
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, i) => (
              <div
                key={project._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface border border-border">
              <Search className="w-9 h-9 text-muted" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
              No matching projects
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Nothing found
              {searchTerm && (
                <>
                  {" "}for &quot;{searchTerm}&quot;
                </>
              )}
              . Try a different search or category.
            </p>
            <Button onClick={clearFilters} size="lg" className="mt-6">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;