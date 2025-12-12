import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorkExperienceFormValues {
  type: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: string; // ✅ غيّر لـ image (مش certificate)
}

interface FormProps {
  initialData?: Partial<WorkExperienceFormValues>;
  isEditing?: boolean;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

const Form = ({ initialData = {}, isEditing = false, onSubmit, onClose }: FormProps) => {
  const [formData, setFormData] = useState<WorkExperienceFormValues>({
    type: initialData.type || "work",
    title: initialData.title || "",
    organization: initialData.organization || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    description: initialData.description || "",
    image: initialData.image || "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null); // ✅ غيّر لـ imageFile

  useEffect(() => {
    setFormData({
      type: initialData.type || "work",
      title: initialData.title || "",
      organization: initialData.organization || "",
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      description: initialData.description || "",
      image: initialData.image || "",
    });
    setImageFile(null);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]); // ✅ هنا بنخزن الـ File object
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitFormData = new FormData();
    submitFormData.append('type', formData.type);
    submitFormData.append('title', formData.title);
    submitFormData.append('organization', formData.organization);
    submitFormData.append('startDate', formData.startDate);
    submitFormData.append('endDate', formData.endDate);
    submitFormData.append('description', formData.description);
    
    // ✅ لو فيه file، نبعته باسم "image" (مش "certificate")
    if (imageFile) {
      submitFormData.append('image', imageFile); // ⭐ المهم: اسم الـfield = image
    } else if (formData.image) {
      // لو مفيش file جديد، نبعت الـ URL القديمة
      submitFormData.append('image', formData.image);
    }

    onSubmit(submitFormData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E2235] rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-[#F8F9FC] dark:border-[#121629] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#111827] dark:text-[#E2E8F0]">
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Field */}
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Type *
            </label>
            <Select value={formData.type} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="volunteering">Volunteering</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="activity">Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Title *
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
              placeholder="e.g., Software Developer"
            />
          </div>

          {/* Organization Field */}
          <div className="space-y-2">
            <label htmlFor="organization" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Organization *
            </label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
              placeholder="e.g., Google Inc."
            />
          </div>

          {/* Start Date Field */}
          <div className="space-y-2">
            <label htmlFor="startDate" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Start Date *
            </label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
            />
          </div>

          {/* End Date Field */}
          <div className="space-y-2">
            <label htmlFor="endDate" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              End Date *
            </label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Description *
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
              placeholder="Describe your role and responsibilities..."
            />
          </div>

          {/* Image Upload Field (Optional) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
              Certificate Image (Optional) {isEditing && "(Leave empty to keep current)"}
            </label>
            <Input
              id="image" // ✅ غيّر الـ id
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
            />
            {isEditing && formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current image:</p>
                {formData.image.startsWith('http') ? (
                  <img src={formData.image} alt="Certificate" className="w-32 h-32 object-cover rounded mt-1 border border-[#F8F9FC] dark:border-[#121629]" />
                ) : (
                  <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2563EB] dark:text-[#4A7CFE] hover:underline">
                    View Certificate →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white flex-1">
              {isEditing ? "Update Experience" : "Add Experience"}
            </Button>
            <Button type="button" onClick={onClose} variant="outline" className="border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;