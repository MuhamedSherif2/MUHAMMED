import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const Services = () => {
  const context = useContext(Context);
  if (!context) return null;

  const { services, portfolioActions, userToken } = context;
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  
  // State for form
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null, // ✅ Changed from icon to image
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      if (hasFetched) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await portfolioActions.loadServices?.();
        setHasFetched(true);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadServices, 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null, // ✅ Changed to image
    });
    setEditingService(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userToken) return;

    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // ✅ Changed from icon to image
      }

      if (editingService) {
        // Update existing service
        await portfolioActions.updateExistingService?.(
          editingService._id,
          userToken,
          formDataToSend
        );
      } else {
        // Add new service
        await portfolioActions.addNewService?.(userToken, formDataToSend);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit service
  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null, // ✅ Changed to image
    });
    setShowForm(true);
  };

  // Handle delete service
  const handleDelete = async (serviceId: string) => {
    if (!userToken) return;
    
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await portfolioActions.deleteExistingService?.(serviceId, userToken);
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service. Please try again.");
    }
  };

  // Loading State
  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-[#0B0E1D]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                Services
              </h2>
              <p className="text-[#4B5563] dark:text-[#94A3B8]">
                What I can do for you
              </p>
            </div>
            {userToken && (
              <Button disabled className="opacity-50 cursor-not-allowed">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-[#0B0E1D] min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
              Services
            </h2>
            <p className="text-[#4B5563] dark:text-[#94A3B8]">
              Professional services tailored to your needs
            </p>
          </div>
          
          {userToken && (
            <Button 
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && userToken && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E2235] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0]">
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                               rounded-lg bg-white dark:bg-[#121629] text-gray-900 dark:text-gray-100
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="e.g., Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                               rounded-lg bg-white dark:bg-[#121629] text-gray-900 dark:text-gray-100
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      required
                      placeholder="Describe your service..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Service Image {!editingService && "*"}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                                 rounded-lg bg-white dark:bg-[#121629] text-gray-900 dark:text-gray-100
                                 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                                 file:border-0 file:text-sm file:font-medium
                                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                                 dark:file:bg-blue-900/20 dark:file:text-blue-300"
                        required={!editingService}
                      />
                      {editingService?.image && !formData.image && (
                        <div className="w-10 h-10">
                          <img 
                            src={editingService.image} 
                            alt="Current image"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {editingService ? "Leave empty to keep current image" : "Recommended: 100x100px image"}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Saving...
                        </>
                      ) : editingService ? (
                        "Update Service"
                      ) : (
                        "Add Service"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service._id}
                className="group bg-white dark:bg-[#1E2235] border border-gray-200 dark:border-[#121629] 
                          hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 
                          hover:shadow-lg overflow-hidden"
              >
                {/* Service Image */}
                {service.image && (
                  <div className="p-6 pb-0">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4 
                                group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-8 h-8"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallbackIcon = document.createElement('div');
                            fallbackIcon.className = 'w-8 h-8 bg-blue-500 rounded-lg';
                            parent.appendChild(fallbackIcon);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6 pt-4">
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-3 
                              group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Admin Actions */}
                  {userToken && (
                    <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 dark:bg-[#1E2235] rounded-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No services added yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by adding your first service
              </p>
              {userToken ? (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Service
                </Button>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Login to add services
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;