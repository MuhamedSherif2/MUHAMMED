import Image from "next/image";
import { Briefcase, Building, FileText, ExternalLink } from "lucide-react";
import { WorkExperinceStatic } from "@/lib/data";

const formatDate = (dateString: string) => {
  if (!dateString) return "Present";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const WorkExperience = () => {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text mb-3">Work Experience</h2>
          <p className="text-muted">Professional journey and career milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WorkExperinceStatic.map((exp) => (
            <div
              key={exp._id}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {exp.certificate && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={exp.certificate}
                    alt={exp.organization}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-surface text-primary border border-border capitalize">
                    {exp.type}
                  </span>
                  <span className="text-sm text-muted">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-text">{exp.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted">
                    <Building className="w-4 h-4" />
                    <span>{exp.organization}</span>
                  </div>
                </div>

                <p className="text-muted mb-6">{exp.description}</p>

                {exp.certificate && (
                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;