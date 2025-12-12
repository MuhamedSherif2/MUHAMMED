import { Context } from "@/context"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const UniqueProject = () => {
    const context = useContext(Context);
    if (!context) return null;
    const { setSelectProject, uniqueProjects, portfolioActions } = context;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (uniqueProjects.length === 0) {
                try {
                    await portfolioActions.loadUniqueProjects();
                } catch (err) {
                    console.error("Failed to load projects:", err);
                }
            }
            setLoading(false);
        };
        loadData();
    }, [uniqueProjects, portfolioActions]);

    if (!context || loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin h-12 w-12 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
            </div>
        );
    }

    if (uniqueProjects.length === 0) {
        return (
            <section className="py-12 bg-white dark:bg-[#0B0E1D]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0]">No featured projects yet</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-white dark:bg-[#0B0E1D]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                        Featured Projects
                    </h2>
                    <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-xl mx-auto">
                        A selection of my latest and most innovative work
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {context.uniqueProjects.slice(0, 3).map((project) => (
                        <Link
                            to={`/projects/${project._id}`}
                            onClick={() => setSelectProject(project._id)}
                            key={project._id}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl mb-3 aspect-video">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>

                            {/* Title Only */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E2E8F0] group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowRight className="w-4 h-4 text-[#4B5563] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        View All Projects
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default UniqueProject