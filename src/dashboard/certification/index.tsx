import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICertifications } from "@/interfaces/server";

const Certification = () => {
  const context = useContext(Context);
  if (!context) return null;

  const { certifications, userToken, portfolioActions } = context;

  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingCert, setEditingCert] = useState<ICertifications | null>(null);
  const [formData, setFormData] = useState({
    certificateTitle: "",
    platform: "",
    year: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load certifications on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await portfolioActions.loadCertifications?.();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAdd = () => {
    setOpenForm(true);
    setEditingCert(null);
    setFormData({ certificateTitle: "", platform: "", year: "" });
    setImageFile(null);
  };

  const handleEdit = (cert: ICertifications) => {
    setOpenForm(true);
    setEditingCert(cert);
    setFormData({
      certificateTitle: cert.certificateTitle,
      platform: cert.platform,
      year: cert.year,
    });
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await portfolioActions.deleteExistingCertification?.(id, userToken || "");
      await portfolioActions.loadCertifications?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete certification");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("certificateTitle", formData.certificateTitle);
    fd.append("platform", formData.platform);
    fd.append("year", formData.year);

    if (imageFile) fd.append("image", imageFile); // اسم الصورة متطابق مع السيرفر

    try {
      if (editingCert) {
        await portfolioActions.updateExistingCertification?.(
          editingCert._id,
          fd,
          userToken || ""
        );
      } else {
        if (!imageFile) return alert("Image is required");
        await portfolioActions.addNewCertification?.(fd, userToken || "");
      }

      setOpenForm(false);
      setEditingCert(null);
      setFormData({ certificateTitle: "", platform: "", year: "" });
      setImageFile(null);
      await portfolioActions.loadCertifications?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save certification");
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button onClick={handleAdd}>Add Certification</Button>
      </div>

      {certifications.length === 0 ? (
        <p>No certifications available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert._id}
              className="p-4 bg-white dark:bg-[#1E2235] rounded-xl shadow-md border dark:border-[#121629]"
            >
              {cert.certificateImage && (
                <img
                  src={cert.certificateImage}
                  alt={cert.certificateTitle}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-semibold text-lg">{cert.certificateTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400">{cert.platform}</p>
              <p className="text-gray-500 dark:text-gray-400">{cert.year}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleEdit(cert)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(cert._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1E2235] rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-lg font-bold mb-4">
              {editingCert ? "Edit Certification" : "Add Certification"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Title"
                value={formData.certificateTitle}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, certificateTitle: e.target.value }))
                }
                required
              />
              <Input
                type="text"
                placeholder="Platform"
                value={formData.platform}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, platform: e.target.value }))
                }
                required
              />
              <Input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, year: e.target.value }))
                }
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files ? e.target.files[0] : null)
                }
                required={!editingCert}
              />

              {editingCert?.certificateImage && (
                <img
                  src={editingCert.certificateImage}
                  className="w-16 h-16 object-cover mt-2 rounded"
                />
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCert ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certification;
