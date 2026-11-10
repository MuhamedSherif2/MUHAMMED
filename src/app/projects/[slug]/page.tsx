import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { ProjectStatic, getSkillsByIds } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return ProjectStatic.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = ProjectStatic.find((p) => p.slug === slug);
    if (!project) return {};
    return { title: `${project.title} | Mohamed Sherif`, description: project.overview };
}

export default async function ProjectDetails({ params }: Props) {
    const { slug } = await params;
    const project = ProjectStatic.find((p) => p.slug === slug);
    if (!project) notFound();

    const skills = getSkillsByIds(project.skills);

    const buttons = [
        { label: "Live Demo", url: project.demo, icon: ExternalLink, style: "bg-primary" },
        { label: "Frontend Code", url: project.githubFront , icon: Github, style: "bg-success" },
        { label: "Backend Code", url: project.githubBack, icon: Github, style: "bg-accent" },
    ].filter((b) => b.url);

    return (
        <section className="bg-background w-full min-h-screen py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    All Projects
                </Link>

                <div className="relative mb-8 h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-border shadow-lg">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        sizes="(min-width: 896px) 896px, 100vw"
                        className="object-cover"
                    />
                </div>

                <div className="bg-surface rounded-xl p-6 md:p-8 border border-border">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-3 mb-8">
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                            {project.projectType}
                        </span>
                        <span className="bg-card text-text text-xs px-3 py-1 rounded-full border border-border">
                            {project.category.title}
                        </span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-text mb-3">Overview</h2>
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <p className="text-muted leading-relaxed">{project.overview}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-text mb-3">Key Features</h2>
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <ul className="space-y-2">
                                {project.keyFeatures.map((f) => (
                                    <li key={f} className="flex items-start">
                                        <span className="text-primary mr-3 shrink-0">•</span>
                                        <span className="text-muted">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-text mb-3">Highlights</h2>
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <ul className="space-y-2">
                                {project.highlights.map((h) => (
                                    <li key={h} className="flex items-start">
                                        <span className="text-success mr-3 shrink-0">✓</span>
                                        <span className="text-muted">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {skills.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-text mb-3">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill._id}
                                        className="inline-flex items-center gap-2 bg-card text-text text-sm px-3 py-1.5 rounded-lg border border-border"
                                    >
                                        <Image src={skill.image} alt="" width={18} height={18} />
                                        {skill.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        {buttons.map(({ label, url, icon: Icon, style }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 flex items-center justify-center gap-3 ${style} text-white px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-[1.02]`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}