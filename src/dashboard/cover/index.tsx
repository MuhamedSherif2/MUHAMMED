import { Context } from "@/context"
import { useContext, useEffect, useState } from "react"
import Form from "./Form"
import { Button } from "@/components/ui/button"

const Cover = () => {
    const context = useContext(Context)
    const [openForm, setOpenForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (context && !context.cover) {
            context.portfolioActions.loadCover()
        }
    }, [context])

    if (!context) {
        return <div>Loading...</div>
    }

    const { cover } = context

    const handleEdit = () => {
        setOpenForm(true)
        setIsEditing(true)
    }

    const handleAdd = () => {
        setOpenForm(true)
        setIsEditing(false)
    }

    const handleDelete = async () => {
        if (!context || !cover) return

        if (window.confirm("Are you sure you want to delete this cover?")) {
            try {
                console.log("🔄 Calling deleteExistingCover with ID:", cover._id)
                await context.portfolioActions.deleteExistingCover(
                    cover._id,
                    context.userToken || ""
                )
                console.log("✅ Cover deleted successfully")
            } catch (error) {
                alert("Failed to delete cover")
            }
        }
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cover</h1>
                <Button 
                    onClick={handleAdd}
                    className="bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white"
                >
                    + Add Cover
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Field</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Name</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">
                                {cover?.name || <span className="text-gray-400">Not set</span>}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Title</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">
                                {cover?.title || <span className="text-gray-400">Not set</span>}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Short Tagline</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">
                                {cover?.shortTagline || <span className="text-gray-400">Not set</span>}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Call To Action</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">
                                {cover?.callToAction || <span className="text-gray-400">Not set</span>}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Image</td>
                            <td className="py-3 px-4">
                                {cover?.photo ? (
                                    <div>
                                        <img 
                                            src={cover.photo} 
                                            alt="Cover" 
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Image URL: {cover.photo.substring(0, 50)}...
                                        </p>
                                    </div>
                                ) : (
                                    <span className="text-gray-400">No image</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                    
                    <tfoot className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <td colSpan={2} className="py-4 px-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        {cover ? (
                                            <span>
                                                Cover ID: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{cover._id}</code>
                                            </span>
                                        ) : (
                                            "No cover data"
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleEdit}
                                            disabled={!cover}
                                            variant="outline"
                                            className="border-[#2563EB] text-[#2563EB] dark:border-[#4A7CFE] dark:text-[#4A7CFE] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#4A7CFE] dark:hover:text-white"
                                        >
                                            Update Cover
                                        </Button>
                                        <Button
                                            onClick={handleDelete}
                                            disabled={!cover}
                                            variant="destructive"
                                            className="bg-[#DC2626] dark:bg-[#EF4444] hover:bg-[#B91C1C] dark:hover:bg-[#DC2626] text-white"
                                        >
                                            Delete Cover
                                        </Button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {!cover && (
                <div className="text-center py-8 text-gray-500">
                    No cover data available. Add a cover using the button above.
                </div>
            )}

            {openForm && (
                <Form 
                    isOpen={openForm}
                    onClose={() => setOpenForm(false)}
                    isEditing={isEditing}
                    coverData={cover || undefined}
                />
            )}
        </section>
    )
}

export default Cover
