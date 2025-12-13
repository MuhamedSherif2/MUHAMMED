import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import type { ISkills, ICategory } from "@/interfaces/server";

const Skills = () => {
  const context = useContext(Context);
  if (!context) return null;

  const { skills, skillsCategory, userToken, portfolioActions } = context;

  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkills | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "" });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true);
      try {
        if (!skillsCategory || skillsCategory.length === 0) {
          await portfolioActions.loadSkillsCategory?.();
        }
        if (!skills || skills.length === 0) {
          await portfolioActions.loadSkills?.();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAdd = () => {
    setEditingSkill(null);
    setFormData({ title: "", category: "" });
    setImage(null);
    setOpen(true);
  };

  const handleEdit = (s: ISkills) => {
    setEditingSkill(s);
    setFormData({
      title: s.title,
      category: typeof s.category === "object" ? (s.category as ICategory)._id : s.category,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!userToken) return alert("Login first");
    if (!confirm("Delete this skill?")) return;

    try {
      await portfolioActions.deleteExistingSkill?.(id, userToken);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userToken) return alert("Login first");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      if (image) fd.append("image", image);

      if (editingSkill) {
        await portfolioActions.updateExistingSkill?.(editingSkill._id, userToken, fd);
      } else {
        if (!image) return alert("Image is required");
        await portfolioActions.addNewSkill?.(userToken, fd);
      }

      setOpen(false);
      setEditingSkill(null);
      setFormData({ title: "", category: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save skill");
    }

    setLoading(false);
  };

  const resolveCategoryName = (cat: string | ICategory | undefined) => {
    if (!cat) return "Unknown";
    if (typeof cat === "object") return (cat as ICategory).title;
    const f = skillsCategory.find((c) => c._id === cat);
    return f ? f.title : "Unknown";
  };

  return (
    <section className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      {initialLoading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
        </div>
      ) : skills.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-gray-500">No skills added yet</p>
          <Button className="mt-4" onClick={handleAdd}>
            Add Skill
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((s: ISkills) => (
            <Card key={s._id}>
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {s.image ? (
                  <img src={s.image} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                )}
              </div>

              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>
                  <Badge variant="outline">{resolveCategoryName(s.category)}</Badge>
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEdit(s)}>
                  <Edit size={14} />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(s._id)}>
                  <Trash2 size={14} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData((p) => ({ ...p, category: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {skillsCategory.map((c: ICategory) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Image {editingSkill ? "(optional)" : "(required)"}</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                required={!editingSkill}
              />
              {editingSkill?.image && (
                <img src={editingSkill.image} className="w-16 h-16 object-cover mt-2 rounded" />
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingSkill ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Skills;
