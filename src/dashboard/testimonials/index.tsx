import { useEffect, useState, useContext } from "react";
import { Context } from "@/context";

const AdminTestimonials = () => {
  const context = useContext(Context);
  if (!context)
    return (
      <div className="text-[#4B5563] dark:text-[#94A3B8]">
        Context not found
      </div>
    );

  const { testimonials, portfolioActions } = context;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await portfolioActions.loadTestimonials?.();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleShow = async (id: string, current: boolean) => {
    const formData = new FormData();
    formData.append("isShow", String(!current));

    try {
      await portfolioActions.updateExistingTestimonial(id, formData);
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await portfolioActions.deleteExistingTestimonial(id);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-6 bg-white dark:bg-[#0B0E1D] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-[#111827] dark:text-[#E2E8F0]">
          Manage Testimonials
        </h1>

        <div className="space-y-4 md:space-y-6">
          {testimonials?.map((t) => (
            <div
              key={t._id}
              className="bg-[#F8F9FC] dark:bg-[#121629] border border-[#F8F9FC] dark:border-[#121629]
              rounded-xl p-4 md:p-5 flex flex-col gap-3
              hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2563EB] dark:bg-[#4A7CFE] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.authorName?.charAt(0) || "U"}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-[#E2E8F0]">
                    {t.authorName}
                  </h3>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    t.isShow
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                      : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                  }`}
                >
                  {t.isShow ? "Public" : "Hidden"}
                </span>
              </div>

              {/* Email */}
              <p className="text-sm text-[#4B5563] dark:text-[#94A3B8]">
                {t.authorEmail}
              </p>

              {/* Message */}
              <div className="grow">
                <p className="text-[#4B5563] dark:text-[#94A3B8] italic border-l-2 border-[#2563EB] dark:border-[#4A7CFE] pl-3 py-1">
                  "{t.message}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 pt-2 mt-2 border-t border-[#F8F9FC] dark:border-[#121629]">
                <button
                  onClick={() => toggleShow(t._id, t.isShow)}
                  className={`py-1.5 px-4 rounded-lg text-sm font-medium transition-colors
                    ${
                      t.isShow
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                >
                  {t.isShow ? "Hide" : "Show"}
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-[#EF4444] hover:bg-[#DC2626] text-white py-1.5 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!testimonials?.length && (
          <div className="text-center py-12">
            <p className="text-[#4B5563] dark:text-[#94A3B8] text-lg">
              No testimonials found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminTestimonials;
