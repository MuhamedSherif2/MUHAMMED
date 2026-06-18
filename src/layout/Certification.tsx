import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import Loading from "@/components/Loading";

const Certification = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (context) {
        try {
          await context.portfolioActions.loadCertifications?.();
        } catch (err) {
          console.error("Error loading certifications:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [context]);

  if (loading || !context) return <Loading />;

  const { certifications } = context;

  return (
    <section className='w-full bg-[#F8F9FC] dark:bg-[#0F172A] py-12'>
      <div className='container mx-auto'>
        <div className='w-full mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Certifications
          </h2>
          
          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            Professional achievements and qualifications
          </p>

          {certifications && certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((c) => (
                <div
                  key={c._id}
                  className="bg-[#F8F9FC] dark:bg-[#121629] rounded-xl border border-[#F8F9FC] dark:border-[#121629] p-6 hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 hover:shadow-lg"
                >
                  {c.certificateImage && (
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={c.certificateImage}
                        alt={c.certificateTitle}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-xl text-[#111827] dark:text-[#E2E8F0] mb-3">
                    {c.certificateTitle}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-[#4B5563] dark:text-[#94A3B8]">
                      {c.platform}
                    </p>
                    <p className="text-[#2563EB] dark:text-[#4A7CFE] font-medium">
                      {c.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
              <div className="w-20 h-20 bg-[#D1E9FF] dark:bg-[#1E2235] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#2563EB] dark:text-[#4A7CFE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                No Certifications Available
              </h3>
              <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-md mx-auto">
                Certifications will appear here once they are added to the portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certification;