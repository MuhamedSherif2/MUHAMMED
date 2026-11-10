import Image from "next/image";
import { CertificationStatic } from "@/lib/data";

const Certification = () => {
  const certifications = CertificationStatic;

  return (
    <section className="w-full bg-surface py-12">
      <div className="container mx-auto">
        <div className="w-full mx-auto px-6">
          <h2 className="text-center font-bold text-3xl md:text-4xl text-text mb-3">
            Certifications
          </h2>

          <p className="text-center text-muted text-lg mb-12 max-w-2xl mx-auto">
            Professional achievements and qualifications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c) => (
              <div
                key={c._id}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {c.certificateImage && (
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={c.certificateImage}
                      alt={c.certificateTitle}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-xl text-text mb-3">
                  {c.certificateTitle}
                </h3>
                <div className="space-y-2">
                  <p className="text-muted">{c.platform}</p>
                  <p className="text-primary font-medium">{c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;