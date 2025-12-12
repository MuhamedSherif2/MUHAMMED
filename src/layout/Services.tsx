import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";

const Services = () => {
  const context = useContext(Context);
  if (!context) return <div className="text-[#4B5563] dark:text-[#94A3B8]">Loading...</div>;

  const [loading, setLoading] = useState(true);
  const { services, portfolioActions } = context

  useEffect(() => {
    const loadData = async () => {
      try {
        await portfolioActions.loadServices?.();
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  return (
    <section className='w-full bg-white dark:bg-[#0B0E1D] py-12'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Services
          </h2>

          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            Professional services I offer to clients
          </p>

          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item._id}
                  className="group bg-[#F8F9FC] dark:bg-[#121629] rounded-xl border border-[#F8F9FC] dark:border-[#121629] overflow-hidden hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Service Image */}
                  {item.image && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-3 group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F8F9FC] dark:border-[#121629]">
                      <span className="text-sm px-3 py-1 bg-[#D1E9FF] dark:bg-[#1E2235] text-[#2563EB] dark:text-[#4A7CFE] rounded-full font-medium">
                        Service
                      </span>
                      <span className="text-[#2563EB] dark:text-[#4A7CFE] group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
              <div className="w-20 h-20 bg-[#D1E9FF] dark:bg-[#1E2235] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#2563EB] dark:text-[#4A7CFE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                No Services Available
              </h3>
              <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-md mx-auto">
                Services will appear here once they are added to the portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
};

export default Services;