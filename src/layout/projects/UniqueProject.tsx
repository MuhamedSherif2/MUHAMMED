import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProjectStatic, getSkillsByIds } from "@/lib/data";
import HoloCard from "@/components/HoloCard";

const FeaturedProjects = () => {
    const featured = ProjectStatic.filter((p) => p.hot);

    return (
        <section id="projects" className="w-full bg-background py-12 scroll-mt-20">
            <div className="container mx-auto px-6">
                <h2 className="text-center font-bold text-3xl md:text-4xl text-text mb-3">
                    Featured Projects
                </h2>
                <p className="text-center text-muted text-lg mb-12 max-w-2xl mx-auto">
                    A selection of my best work
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((p) => {
                        const skills = getSkillsByIds(p.skills);

                        return (
                            <article
                                key={p._id}
                                className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300"
                            >
                                <HoloCard
                                    image={p.image}
                                    backImage={p.image}
                                    alt={p.title}
                                    intensity={0.1}
                                    style={{ 
                                        width: "100%",
                                        aspectRatio: "4 / 3",
                                        borderRadius: "0.75rem",
                                        boxShadow: "0 20px 40px -12px rgb(37 99 235 / 0.35)",
                                    }}
                                />

                                <div className="mt-5 flex flex-1 flex-col">

                                    <h3 className="mb-2 text-xl font-bold text-text">{p.title}</h3>

                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {skills.map((s) => (
                                            <Image
                                                key={s._id}
                                                src={s.image}
                                                alt={s.title}
                                                title={s.title}
                                                width={24}
                                                height={24}
                                            />
                                        ))}
                                    </div>

                                    <Link
                                        href={`/projects/${p.slug}`}
                                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
                                    >
                                        Details
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-block px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;