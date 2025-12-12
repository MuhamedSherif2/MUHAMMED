import { useContext, useEffect, useState } from "react";
import type { IWorkExperince } from "@/interfaces/server";
import { Context } from "@/context";
import Form from "./Form";

const WorkExperience = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WorkExperience must be used within ContextProvider");
  }

  const { workExperince, portfolioActions, userToken } = context;
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<IWorkExperince | null>(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await portfolioActions.loadWorkExperince();
      } catch (error) {
        console.error("❌ Failed to load work experience:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handlers
  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: IWorkExperince) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this experience?")) {
      return;
    }

    if (!userToken) {
      alert("⚠️ You must be logged in to delete");
      return;
    }

    try {
      await portfolioActions.deleteExistingWorkExperince(id, userToken);
    } catch (error) {
      console.error("❌ Failed to delete experience:", error);
      alert("Failed to delete experience");
    }
  };

  const handleFormSubmit = async (submitFormData: FormData) => {
    if (!userToken) {
      alert("⚠️ You must be logged in to save");
      return;
    }
  
    try {
      if (editingItem) {
        await portfolioActions.updateExistingWorkExperince(
          editingItem._id,
          userToken,
          submitFormData
        );
      } else {
        await portfolioActions.addNewWorkExperince(userToken, submitFormData);
      }
  
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("❌ Failed to save experience:", error);
      alert("❌ Failed to save experience. Check console for details.");
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  return (
    <section className='w-full bg-white dark:bg-[#0B0E1D] py-12 min-h-screen'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0]'>
              Work Experience
            </h2>
            
            {userToken && (
              <button
                onClick={handleAdd}
                className="bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto text-lg"
              >
                + Add New Experience
              </button>
            )}
          </div>

          {workExperince.length === 0 ? (
            <div className="text-center py-16 bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
              <p className="text-[#4B5563] dark:text-[#94A3B8] mb-6 text-lg">
                {userToken 
                  ? "No work experience added yet. Start building your portfolio!" 
                  : "No work experience to display."}
              </p>
              {userToken && (
                <button
                  onClick={handleAdd}
                  className="bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                >
                  Add Your First Experience
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {workExperince.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl p-6 border border-[#F8F9FC] dark:border-[#121629] hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`text-xs px-3 py-1.5 rounded-md font-medium capitalize ${
                          exp.type === 'work' 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                            : exp.type === 'internship'
                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                            : exp.type === 'volunteering'
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                        }`}>
                          {exp.type}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-[#111827] dark:text-[#E2E8F0]">
                          {exp.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg md:text-xl font-medium text-[#2563EB] dark:text-[#4A7CFE] mb-2">
                        {exp.organization}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-[#94A3B8]">
                        <span className="px-2 py-1 bg-[#D1E9FF] dark:bg-[#1E2235] text-[#2563EB] dark:text-[#4A7CFE] rounded-md">
                          {formatDate(exp.startDate)}
                        </span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-[#D1E9FF] dark:bg-[#1E2235] text-[#2563EB] dark:text-[#4A7CFE] rounded-md">
                          {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>

                    {userToken && (
                      <div className="flex gap-3 self-start">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="px-4 py-2 text-sm bg-[#FEF3C7] dark:bg-[#92400E] text-[#92400E] dark:text-[#FEF3C7] rounded-lg hover:bg-[#FDE68A] dark:hover:bg-[#B45309] transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="px-4 py-2 text-sm bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#7F1D1D] dark:text-[#FECACA] rounded-lg hover:bg-[#FECACA] dark:hover:bg-[#991B1B] transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#F8F9FC] dark:border-[#121629]">
                    <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>

                  {exp.certificate && (
                    <div className="mt-6 pt-4 border-t border-[#F8F9FC] dark:border-[#121629]">
                      <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#2563EB] dark:text-[#4A7CFE] hover:underline font-medium"
                      >
                        <span>📄 View Certificate</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <Form
              initialData={editingItem || {}}
              isEditing={!!editingItem}
              onSubmit={handleFormSubmit}
              onClose={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;