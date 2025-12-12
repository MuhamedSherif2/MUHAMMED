import { Context } from "@/context"
import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Categories = () => {
    const context = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [newProjectCategory, setNewProjectCategory] = useState('')
    const [newSkillCategory, setNewSkillCategory] = useState('')
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
    const [editSkillValue, setEditSkillValue] = useState('')

    useEffect(() => {
        const loadData = async () => {
            if (!context) return
            setLoading(true)
            try {
                await context.portfolioActions.loadProjectCategories()
                await context.portfolioActions.loadSkillsCategory()
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (!context || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
            </div>
        )
    }

    const {
        projectCategories,
        skillsCategory,
        userToken,
        portfolioActions
    } = context

    // Project Categories Functions
    const handleAddProjectCategory = async () => {
        if (!newProjectCategory.trim() || !userToken) return;
    
        const data = {
            title: newProjectCategory.trim()
        };
    
        try {
            await portfolioActions.addNewProjectCategory(userToken, data);
            setNewProjectCategory('');
        } catch (error) {
            console.error('Error adding project category:', error);
            alert('Failed to add project category');
        }
    };
    

    const handleDeleteProjectCategory = async (id: string) => {
        if (!userToken || !window.confirm('Are you sure you want to delete this project category?')) return

        try {
            await portfolioActions.deleteProjectCategory(id, userToken)
        } catch (error) {
            console.error('Error deleting project category:', error)
            alert('Failed to delete project category')
        }
    }

    // Skills Categories Functions
    const handleAddSkillCategory = async () => {
        if (!newSkillCategory.trim() || !userToken) return

        const formData = new FormData()
        formData.append('title', newSkillCategory.trim())

        try {
            await portfolioActions.addNewSkillsCategory(userToken, formData)
            setNewSkillCategory('')
        } catch (error) {
            console.error('Error adding skill category:', error)
            alert('Failed to add skill category')
        }
    }

    const handleUpdateSkillCategory = async (id: string) => {
        if (!editSkillValue.trim() || !userToken) return
    
        const data = {
            title: editSkillValue.trim()
        }
    
        try {
            console.log("📝 Updating skill category with:", data);
            
            await portfolioActions.updateSkillsCategoryData(id, userToken, data)
            setEditingSkillId(null)
            setEditSkillValue('')
        } catch (error) {
            console.error('Error updating skill category:', error)
            alert('Failed to update skill category')
        }
    }

    const handleDeleteSkillCategory = async (id: string) => {
        if (!userToken || !window.confirm('Are you sure you want to delete this skill category?')) return

        try {
            await portfolioActions.deleteSkillsCategoryData(id, userToken)
        } catch (error) {
            console.error('Error deleting skill category:', error)
            alert('Failed to delete skill category')
        }
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
            </div>

            {/* Project Categories Table */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Project Categories
                    </h2>
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            value={newProjectCategory}
                            onChange={(e) => setNewProjectCategory(e.target.value)}
                            placeholder="Add new project category"
                            className="w-64"
                        />
                        <Button
                            onClick={handleAddProjectCategory}
                            disabled={!newProjectCategory.trim() || !userToken}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Title</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Created At</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        No project categories found
                                    </td>
                                </tr>
                            ) : (
                                projectCategories.map((category, index) => (
                                    <tr
                                        key={category._id}
                                        className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                                            }`}
                                    >
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {category._id.substring(0, 8)}...
                                        </td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                                            {category.title}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Button
                                                onClick={() => handleDeleteProjectCategory(category._id)}
                                                disabled={!userToken}
                                                size="sm"
                                                variant="destructive"
                                                className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <td colSpan={4} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                                    Total: {projectCategories.length} project categories
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Skills Categories Table */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Skills Categories
                    </h2>
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            value={newSkillCategory}
                            onChange={(e) => setNewSkillCategory(e.target.value)}
                            placeholder="Add new skill category"
                            className="w-64"
                        />
                        <Button
                            onClick={handleAddSkillCategory}
                            disabled={!newSkillCategory.trim() || !userToken}
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Title</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Created At</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skillsCategory.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        No skill categories found
                                    </td>
                                </tr>
                            ) : (
                                skillsCategory.map((category, index) => (
                                    <tr
                                        key={category._id}
                                        className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                                            }`}
                                    >
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {category._id.substring(0, 8)}...
                                        </td>
                                        <td className="py-3 px-4">
                                            {editingSkillId === category._id ? (
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={editSkillValue}
                                                        onChange={(e) => setEditSkillValue(e.target.value)}
                                                        className="flex-1"
                                                        autoFocus
                                                    />
                                                    <Button
                                                        onClick={() => handleUpdateSkillCategory(category._id)}
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setEditingSkillId(null)
                                                            setEditSkillValue('')
                                                        }}
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-900 dark:text-white font-medium">
                                                        {category.title}
                                                    </span>
                                                    <Button
                                                        onClick={() => {
                                                            setEditingSkillId(category._id)
                                                            setEditSkillValue(category.title)
                                                        }}
                                                        size="sm"
                                                        variant="outline"
                                                        className="ml-2 text-blue-600 dark:text-blue-400"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Button
                                                onClick={() => handleDeleteSkillCategory(category._id)}
                                                disabled={!userToken}
                                                size="sm"
                                                variant="destructive"
                                                className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <td colSpan={4} className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                                    Total: {skillsCategory.length} skill categories
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {!userToken && (
                <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 rounded-lg">
                    ⚠️ You need to be logged in to manage categories
                </div>
            )}
        </section>
    )
}

export default Categories