// src/dashboard/projects/FormProject.tsx
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { IProject, ICategory, ISkills } from "@/interfaces/server";
import { Context } from "@/context";

interface FormProjectProps {
  project?: IProject;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const FormProject = ({ project, onClose, onSubmit }: FormProjectProps) => {
  const ctx = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hot, setHot] = useState(false);
  const [githubFront, setGithubFront] = useState("");
  const [githubBack, setGithubBack] = useState("");
  const [demo, setDemo] = useState("");
  const [category, setCategory] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [skills, setSkills] = useState<ISkills[]>([]);

  // Load categories and skills
  useEffect(() => {
    const fetchData = async () => {
      if (!ctx) return;

      try {
        await ctx.portfolioActions.loadProjectCategories?.();
        await ctx.portfolioActions.loadSkills?.();

        setCategories(ctx.projectCategories || []);
        setSkills(ctx.skills || []);
      } catch (err) {
        console.error("Failed to load categories or skills", err);
      }
    };
    fetchData();
  }, [ctx]);

  // Load project data if editing
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setHot(project.hot);
      setGithubFront(project.githubFront || "");
      setGithubBack(project.githubBack || "");
      setDemo(project.demo || "");
      setCategory(project.categoryDetails?._id || "");
      setSelectedSkills(project.skillDetails?.map(s => s._id) || []);
    }
  }, [project]);

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("title", title);
    formData.append("description", description);
  
    // Image
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (project && project.image) {
      // لو تعديل ومافيش صورة جديدة نرسل نفس الصورة القديمة كـ string
      formData.append("image", project.image);
    }
  
    formData.append("hot", String(hot));
    formData.append("githubFront", githubFront);
    formData.append("githubBack", githubBack);
    formData.append("demo", demo);
    formData.append("category", category);
  
    // Skills كـ JSON
    formData.append("skills", JSON.stringify(selectedSkills));
  
    onSubmit(formData);
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1E2235] rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full shadow-2xl border border-[#F8F9FC] dark:border-[#121629] my-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">Title *</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">Description *</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">Image</label>
            <Input type="file" onChange={e => setImageFile(e.target.files?.[0] || null)} />
            {project?.image && !imageFile && (
              <img src={project.image} alt="Current" className="w-40 h-40 object-cover mt-2 rounded-lg border" />
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">Category *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">Skills *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 max-h-60 overflow-y-auto">
              {skills.map(skill => (
                <div key={skill._id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedSkills.includes(skill._id)}
                    onCheckedChange={() => toggleSkill(skill._id)}
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-200">{skill.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input value={githubFront} onChange={e => setGithubFront(e.target.value)} placeholder="GitHub Frontend" />
            <Input value={githubBack} onChange={e => setGithubBack(e.target.value)} placeholder="GitHub Backend" />
            <Input value={demo} onChange={e => setDemo(e.target.value)} placeholder="Live Demo" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox checked={hot} onCheckedChange={() => setHot(prev => !prev)} />
            <label className="text-sm font-medium leading-none">Mark as featured project</label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
              {project ? "Update Project" : "Add Project"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProject;
