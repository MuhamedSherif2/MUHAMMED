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
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="relative">
                    <div className="animate-spin h-16 w-16 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 animate-spin h-16 w-16 border-4 border-[#2563EB] dark:border-[#4A7CFE] border-t-transparent rounded-full"></div>
                </div>
            </div>
        );
    }

    if (uniqueProjects.length === 0) {
        return (
            <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0E1D] dark:to-[#0F172A]">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <div className="max-w-md mx-auto p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No featured projects yet</h2>
                        <p className="text-gray-500 dark:text-gray-400">Check back soon for updates!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0E1D] dark:to-[#0F172A]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#4A7CFE] animate-pulse"></span>
                        <span className="text-sm font-medium text-[#2563EB] dark:text-[#4A7CFE]">Featured Work</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        A selection of my latest and most innovative work
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {context.uniqueProjects.slice(0, 3).map((project) => (
                        <Link
                            to={`/projects/${project._id}`}
                            onClick={() => setSelectProject(project._id)}
                            key={project._id}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-2">
                                {project.image && (
                                    <>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </div>
                            </div>

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

                            <div className="flex items-center justify-between p-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors duration-300 leading-tight">
                                    {project.title}
                                </h3>
                                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-all duration-300 group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-3 group bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] dark:from-[#4A7CFE] dark:to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#1E40AF] dark:hover:from-[#3B82F6] dark:hover:to-[#2563EB] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-95 shadow-lg"
                    >
                        <span>View All Projects</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default UniqueProject