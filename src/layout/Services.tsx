import Image from "next/image";
import { ServicesStatic } from "@/lib/data";

const Services = () => {
  return (
    <section className="w-full bg-background py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-bold text-3xl md:text-4xl text-text mb-3">
          Services
        </h2>
        <p className="text-center text-muted text-lg mb-12 max-w-2xl mx-auto">
          Professional services I offer to clients
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ServicesStatic.map((item) => (
            <div
              key={item._id}
              className="group bg-surface rounded-xl border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {item.image && (
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-5">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;