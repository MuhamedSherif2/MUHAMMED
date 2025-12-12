import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";
import { Briefcase, Calendar, Building, FileText } from "lucide-react";

const WorkExperience = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (context && !context.workExperince) {
        try {
          await context.portfolioActions.loadWorkExperince?.();
        } catch (err) {
          console.error("Failed to load work experience:", err);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [context]);

  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  const { workExperince } = context;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'work': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
      case 'internship': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300';
      case 'volunteering': return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
      case 'freelance': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300';
    }
  };

  return(
    <section className='w-full bg-[#F8F9FC] dark:bg-[#0F172A] py-12'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Work Experience
          </h2>
          
          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            Professional journey and career milestones
          </p>

          {workExperince && workExperince.length > 0 ? (
            <div className="space-y-8">
              {workExperince.map((exp) => (
                <div 
                  key={exp._id}
                  className="bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl p-6 border border-[#F8F9FC] dark:border-[#121629] hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Timeline & Type */}
                    <div className="lg:w-1/4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(exp.type)}`}>
                            {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[#4B5563] dark:text-[#94A3B8]">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:w-3/4">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-5 h-5 text-[#2563EB] dark:text-[#4A7CFE]" />
                          <h3 className="text-xl md:text-2xl font-bold text-[#111827] dark:text-[#E2E8F0]">
                            {exp.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[#4B5563] dark:text-[#94A3B8] mb-4">
                          <Building className="w-4 h-4" />
                          <span className="text-lg font-medium">{exp.organization}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>

                      {exp.certificate && (
                        <div className="pt-4 border-t border-[#F8F9FC] dark:border-[#121629]">
                          <a
                            href={exp.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#2563EB] dark:text-[#4A7CFE] hover:underline font-medium"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Certificate</span>
                            <span>→</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
              <div className="w-20 h-20 bg-[#D1E9FF] dark:bg-[#1E2235] rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-[#2563EB] dark:text-[#4A7CFE]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                No Work Experience
              </h3>
              <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-md mx-auto">
                Work experience will appear here once it is added to the portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
};

export default WorkExperience;