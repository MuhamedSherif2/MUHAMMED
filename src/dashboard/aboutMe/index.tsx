import { Button } from "@/components/ui/button"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import { Textarea } from "@/components/ui/textarea"

const AboutMe = () => {
  const context = useContext(Context)
  if (!context) return null

  const { aboutMe, userToken, portfolioActions } = context

  const [loading, setLoading] = useState(true)
  const [openForm, setOpenForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [experience, setExperience] = useState("")
  const [uniquePoint, setUniquePoint] = useState("")
  const [careerGoals, setCareerGoals] = useState("")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await portfolioActions.loadAboutMe()
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAdd = () => {
    setOpenForm(true)
    setIsEditing(false)
    setExperience("")
    setUniquePoint("")
    setCareerGoals("")
  }

  const handleEdit = () => {
    if (!aboutMe) return
    setOpenForm(true)
    setIsEditing(true)
    setExperience(aboutMe.experience || "")
    setUniquePoint(aboutMe.uniquePoint || "")
    setCareerGoals(aboutMe.careerGoals || "")
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this information?")) return
    try {
      await portfolioActions.deleteAbout(userToken || "")
      await portfolioActions.loadAboutMe()
    } catch (err) {
      console.error(err)
      alert("Failed to delete information")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await portfolioActions.updateAbout({ experience, uniquePoint, careerGoals }, userToken || "")
      } else {
        await portfolioActions.addAbout({ experience, uniquePoint, careerGoals }, userToken || "")
      }
      setOpenForm(false)
      setExperience("")
      setUniquePoint("")
      setCareerGoals("")
      setIsEditing(false)
      await portfolioActions.loadAboutMe()
    } catch (err) {
      console.error(err)
      alert("Failed to save information")
    }
  }

  const formAboutMe = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="experience">Experience</label>
        <Textarea id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="uniquePoint">Unique Point</label>
        <Textarea id="uniquePoint" value={uniquePoint} onChange={(e) => setUniquePoint(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="careerGoals">Career Goals</label>
        <Textarea id="careerGoals" value={careerGoals} onChange={(e) => setCareerGoals(e.target.value)} required />
      </div>
      <div className="flex gap-3">
        <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
        <Button type="button" onClick={() => setOpenForm(false)} variant="outline">Cancel</Button>
      </div>
    </form>
  )

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </section>
    )
  }

  return (
    <section className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About Me</h1>
        <Button onClick={handleAdd}>Add About Me</Button>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1E2235] rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit About Me" : "Add About Me"}</h2>
            {formAboutMe()}
          </div>
        </div>
      )}

      {!aboutMe ? (
        <p>No About Me information available.</p>
      ) : (
        <div className="bg-white dark:bg-[#1E2235] rounded-xl p-6 shadow-sm border border-[#F8F9FC] dark:border-[#121629]">
          <h3 className="font-semibold mb-2">Professional Experience</h3>
          <p className="mb-4">{aboutMe.experience}</p>
          <h3 className="font-semibold mb-2">Unique Qualities</h3>
          <p className="mb-4">{aboutMe.uniquePoint}</p>
          <h3 className="font-semibold mb-2">Career Goals</h3>
          <p>{aboutMe.careerGoals}</p>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleEdit} variant="outline">Edit</Button>
            <Button onClick={handleDelete} variant="destructive">Delete</Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default AboutMe
