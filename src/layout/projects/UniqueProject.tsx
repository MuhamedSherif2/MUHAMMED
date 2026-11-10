import Link from "next/link";
import { ProjectStatic } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";

const FeaturedProjects = () => {
    const featured = ProjectStatic.filter((p) => p.hot).slice(0, 3);

    return (
        <section id="projects" className="w-full bg-background py-12 scroll-mt-20">
            <div className="container mx-auto px-6">
                <h2 className="text-center font-bold text-3xl md:text-4xl text-text mb-3">
                    Featured Projects
                </h2>
                <p className="text-center text-muted text-lg mb-12 max-w-2xl mx-auto">
                    A selection of my best work
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((p) => (
                        <ProjectCard key={p._id} project={p} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/projects"
                        className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;