import { useEffect, useState, useContext } from "react";
import { Context } from "@/context";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Testimonials = () => {
  const context = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const testimonials = context?.showTestimonials || [];
  const displayedTestimonials = testimonials.slice(0, 2);

  useEffect(() => {
    context?.portfolioActions.loadShowTestimonials?.();
  }, [context]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!context?.userToken) {
      setSubmitError("Please login to submit a testimonial");
      return;
    }
    
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append("authorName", name);
      formData.append("authorEmail", email);
      formData.append("message", message);
      
      await context.portfolioActions.addNewTestimonial?.(formData);
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setSubmitSuccess(true);
      
      // Refresh testimonials
      context?.portfolioActions.loadShowTestimonials?.();
      
    } catch (err: any) {
      console.error("Error submitting testimonial:", err);
      setSubmitError(err.message || "Failed to submit testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-600 dark:text-green-400 text-center">
                ✅ Thank you! Your testimonial has been submitted for approval.
              </p>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">{submitError}</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ---- Public Testimonial Form - 60% ---- */}
            <div className="lg:w-[60%]">
              <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 md:p-8 rounded-2xl border border-[#F8F9FC] dark:border-[#121629] shadow-lg">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-6">
                  Share Your Experience
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Your Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent transition-all duration-300"
                        required
                        disabled={submitting}
                        minLength={2}
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <Label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Your Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent transition-all duration-300"
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                      Your Message
                    </Label>
                    <Textarea
                      placeholder="Share your experience working with me..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 md:p-4 rounded-xl border border-gray-300 dark:border-[#2A2F45] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent h-40 md:h-48 resize-none transition-all duration-300"
                      required
                      disabled={submitting}
                      minLength={10}
                      maxLength={1000}
                    />
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {message.length}/1000
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 md:py-4 rounded-xl font-semibold text-lg ${
                      submitting
                        ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                        : 'bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6]'
                    } text-white transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100`}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  
                </form>
              </div>
            </div>

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
              
              {displayedTestimonials.length > 0 && testimonials.length > 2 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      alert(`There are ${testimonials.length - 2} more testimonials available.`);
                    }}
                    className="text-[#2563EB] dark:text-[#4A7CFE] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] font-medium transition-colors duration-300"
                  >
                    View all testimonials ({testimonials.length})
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