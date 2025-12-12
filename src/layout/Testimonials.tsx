import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { Context } from "@/context";

const Testimonials = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // form fields
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const hasFetchedRef = useRef(false);
  const isMountedRef = useRef(true);

  const loadTestimonials = useCallback(async () => {
    if (!context || hasFetchedRef.current || !isMountedRef.current) return;
    
    hasFetchedRef.current = true;
    
    try {
      await context.portfolioActions.loadShowTestimonials?.();
      if (isMountedRef.current) {
        setError(null);
      }
    } catch (err: any) {
      console.error("Error loading testimonials:", err);
      if (isMountedRef.current) {
        setError(err.message || "Failed to load testimonials");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [context]);

  useEffect(() => {
    isMountedRef.current = true;
    
    // تأخير الطلب لمنع التحميل المتزامن مع المكونات الأخرى
    const timer = setTimeout(() => {
      loadTestimonials();
    }, 200);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [loadTestimonials]);

  // ---- Submit Testimonial ---- //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!context?.userToken) {
      alert("You must be logged in to submit a testimonial.");
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("authorName", authorName.trim());
    formData.append("authorEmail", authorEmail.trim());
    formData.append("message", message.trim());

    try {
      await context.portfolioActions.addNewTestimonial?.(formData);
      
      // إعادة تحميل الشهادات بعد الإضافة
      hasFetchedRef.current = false;
      await loadTestimonials();
      
      // Reset form
      setAuthorName("");
      setAuthorEmail("");
      setMessage("");
      
      alert("Thank you! Your testimonial is submitted and awaiting approval.");
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!context) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#2563EB] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading context...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <section className='w-full bg-white dark:bg-[#0B0E1D] py-12 min-h-[400px]'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Testimonials
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin h-14 w-14 border-4 border-[#2563EB] dark:border-[#4A7CFE] border-t-transparent rounded-full"></div>
              <div className="absolute inset-0 animate-ping h-14 w-14 border-2 border-blue-300 dark:border-blue-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const visibleTestimonials = context.showTestimonials || [];
  const displayedTestimonials = visibleTestimonials.slice(0, 2);

  return (
    <section className='w-full bg-white dark:bg-[#0B0E1D] py-12'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Testimonials
          </h2>

          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            What clients say about my work
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ---- Add Testimonial Form - 60% ---- */}
            <div className="lg:w-[60%]">
              <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 md:p-8 rounded-2xl border border-[#F8F9FC] dark:border-[#121629] shadow-lg">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-6">
                  Share Your Experience
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent transition-all duration-300"
                        required
                        disabled={submitting}
                        minLength={2}
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent transition-all duration-300"
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                      Your Message *
                    </label>
                    <textarea
                      placeholder="Share your experience working with me..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent h-40 md:h-48 resize-none transition-all duration-300"
                      required
                      disabled={submitting}
                      minLength={10}
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {message.length}/500
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !context.userToken}
                    className={`w-full py-3 md:py-4 rounded-xl font-semibold text-lg ${
                      submitting || !context.userToken
                        ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                        : 'bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6]'
                    } text-white transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100`}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Submitting...
                      </div>
                    ) : !context.userToken ? (
                      "Login to Submit"
                    ) : (
                      "Submit Testimonial"
                    )}
                  </button>
                  
                  {!context.userToken && (
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
                      Please log in to submit a testimonial
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* ---- Show Public Testimonials - 40% ---- */}
            <div className="lg:w-[40%]">
              <div className="space-y-6">
                {displayedTestimonials.length > 0 ? (
                  displayedTestimonials.map((t: any) => (
                    <div
                      key={t._id}
                      className="bg-[#F8F9FC] dark:bg-[#121629] p-5 md:p-6 rounded-2xl border border-[#F8F9FC] dark:border-[#121629] hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3 md:gap-4 mb-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-[#2563EB] to-[#7C3AED] dark:from-[#4A7CFE] dark:to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shrink-0">
                          {t.authorName?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-[#111827] dark:text-[#E2E8F0] truncate">
                            {t.authorName}
                          </h3>
                          <p className="text-sm text-[#4B5563] dark:text-[#94A3B8] mt-1 truncate">
                            {t.authorEmail}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-2xl md:text-3xl text-[#2563EB] dark:text-[#4A7CFE]">"</div>
                        <p className="text-[#4B5563] dark:text-[#94A3B8] italic text-base md:text-lg leading-relaxed pl-5 md:pl-6 pt-3 md:pt-4 line-clamp-4">
                          {t.message}
                        </p>
                        <div className="absolute -bottom-2 -right-2 text-2xl md:text-3xl text-[#2563EB] dark:text-[#4A7CFE]">"</div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {new Date(t.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl p-6 md:p-8 text-center h-full flex items-center justify-center min-h-[300px]">
                    <div>
                      <div className="w-16 h-16 bg-gray-200 dark:bg-[#2A2F45] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        No testimonials yet
                      </h3>
                      <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-md mx-auto">
                        Be the first to share your experience!
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {displayedTestimonials.length > 0 && visibleTestimonials.length > 2 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      // يمكنك إضافة منطق لتحميل المزيد هنا
                      alert(`There are ${visibleTestimonials.length - 2} more testimonials available.`);
                    }}
                    className="text-[#2563EB] dark:text-[#4A7CFE] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] font-medium transition-colors duration-300"
                  >
                    View all testimonials ({visibleTestimonials.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;