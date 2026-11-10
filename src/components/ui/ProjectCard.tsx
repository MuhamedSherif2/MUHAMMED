import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { IProject } from "@/interfaces/server";
import { getSkillsByIds } from "@/lib/data";

const ProjectCard = ({ project }: { project: IProject }) => {
    const skills = getSkillsByIds(project.skills);
    const repos = [
        { label: "Frontend repo", url: project.githubFront },
        { label: "Backend repo", url: project.githubBack },
    ].filter((r): r is { label: string; url: string } => Boolean(r.url));

    return (
        <div className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-primary font-medium mb-2">
                    {project.projectType}
                </span>
                <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.overview}
                </p>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {skills.map((skill) => (
                        <Image
                            key={skill._id}
                            src={skill.image}
                            alt={skill.title}
                            title={skill.title}
                            width={24}
                            height={24}
                        />
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-primary font-medium hover:underline"
                    >
                        Details
                    </Link>
                    <div className="flex gap-3 text-muted">
                        {repos.map((repo) => (
                            <a
                                key={repo.label}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={repo.label}
                                title={repo.label}
                            >
                                <Github className="w-5 h-5 hover:text-primary" />
                            </a>
                        ))}
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                            <ExternalLink className="w-5 h-5 hover:text-primary" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;