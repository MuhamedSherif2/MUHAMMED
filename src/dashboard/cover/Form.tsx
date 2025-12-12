import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/context";

interface FormProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    coverData?: any;
}

const Form = ({ isOpen, onClose, isEditing, coverData }: FormProps) => {
    const context = useContext(Context);
    
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        shortTagline: "",
        callToAction: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // تحميل البيانات في حالة التعديل
    useEffect(() => {
        if (isEditing && coverData) {
            setFormData({
                name: coverData.name || "",
                title: coverData.title || "",
                shortTagline: coverData.shortTagline || "",
                callToAction: coverData.callToAction || "",
            });
        } else {
            // إعادة تعيين البيانات في حالة الإضافة
            setFormData({
                name: "",
                title: "",
                shortTagline: "",
                callToAction: "",
            });
            setImageFile(null);
        }
    }, [isEditing, coverData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!context) return;

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("shortTagline", formData.shortTagline);
            formDataToSend.append("callToAction", formData.callToAction);
            
            if (imageFile) {
                formDataToSend.append("image", imageFile);
            }

            if (isEditing && coverData) {
                // تحديث البيانات
                await context.portfolioActions.updateExistingCover(
                    coverData._id,
                    context.userToken || "",
                    formDataToSend
                );
            } else {
                // إضافة جديدة
                await context.portfolioActions.addNewCover(
                    context.userToken || "",
                    formDataToSend
                );
            }

            onClose();
        } catch (error) {
            console.error("Error saving cover:", error);
            alert("Failed to save cover");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1E2235] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-[#F8F9FC] dark:border-[#121629]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#E2E8F0]">
                        {isEditing ? "Edit Cover Information" : "Add Cover Information"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                            Name
                        </label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="shortTagline" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                            Short Tag line
                        </label>
                        <Textarea
                            id="shortTagline"
                            value={formData.shortTagline}
                            onChange={handleChange}
                            required
                            className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                            Photo {isEditing && "(Leave empty to keep current)"}
                        </label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        />
                        {isEditing && coverData?.photo && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Current image:</p>
                                <img 
                                    src={coverData.photo} 
                                    alt="Current" 
                                    className="w-32 h-32 object-cover rounded mt-1"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="callToAction" className="block text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                            Call To Action
                        </label>
                        <Input
                            id="callToAction"
                            value={formData.callToAction}
                            onChange={handleChange}
                            required
                            className="bg-white dark:bg-[#1E2235] border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            className="bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white flex-1"
                        >
                            {isEditing ? "Update Cover" : "Add Cover"}
                        </Button>
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                            className="border-[#F8F9FC] dark:border-[#121629] text-[#111827] dark:text-[#E2E8F0]"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Form;