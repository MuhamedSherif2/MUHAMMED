import { Context } from "@/context"
import { useContext, useState } from "react"

const Contact = () => {
  const context = useContext(Context)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!context) {
      setError("Context not available")
      return
    }

    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }
    
    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }
    
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required")
      return
    }
    
    if (!formData.message.trim()) {
      setError("Message is required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    const phoneRegex = /^[0-9+\-\s()]+$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name.trim())
      formDataToSend.append("email", formData.email.trim())
      formDataToSend.append("phoneNumber", formData.phoneNumber.trim())
      formDataToSend.append("message", formData.message.trim())

      await context.sendMessage(formDataToSend)
      
      setSuccess(true)
      
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: ""
      })
      
      setTimeout(() => setSuccess(false), 5000)
      
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid data. Please check your inputs.")
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.")
      } else {
        setError(err.response?.data?.message || "Failed to send message. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!context) {
    return <div className="text-[#4B5563] dark:text-[#94A3B8]">Error: Context not available</div>
  }

  return (
    <section className='w-full bg-[#F8F9FC] dark:bg-[#0F172A] py-12'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Contact Us
          </h2>
          
          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            Get in touch with us. We'd love to hear from you.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ---- Contact Form - 60% ---- */}
            <div className="lg:w-[60%]">
              <div className="bg-[#F8F9FC] dark:bg-[#121629] p-8 rounded-2xl border border-[#F8F9FC] dark:border-[#121629] shadow-lg">
                {success && (
                  <div className="mb-6 p-4 bg-[#DCFCE7] dark:bg-[#166534] border border-[#22C55E] dark:border-[#16A34A] text-[#166534] dark:text-[#BBF7D0] rounded-xl text-center">
                    ✅ Thank you! Your message has been sent successfully.
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-[#FEE2E2] dark:bg-[#7F1D1D] border border-[#EF4444] dark:border-[#DC2626] text-[#7F1D1D] dark:text-[#FECACA] rounded-xl text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl border border-[#F8F9FC] dark:border-[#121629] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent text-base"
                        placeholder="John Doe" 
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl border border-[#F8F9FC] dark:border-[#121629] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent text-base"
                        placeholder="name@example.com" 
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phoneNumber" 
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl border border-[#F8F9FC] dark:border-[#121629] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent text-base"
                      placeholder="+20 123 456 7890" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                      Your Message
                    </label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-4 rounded-xl border border-[#F8F9FC] dark:border-[#121629] bg-white dark:bg-[#1E2235] text-[#111827] dark:text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#4A7CFE] focus:border-transparent resize-none text-base"
                      placeholder="Tell us about your project or inquiry..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      loading 
                        ? 'bg-[#9CA3AF] dark:bg-[#4B5563] cursor-not-allowed' 
                        : 'bg-[#2563EB] dark:bg-[#4A7CFE] hover:bg-[#1D4ED8] dark:hover:bg-[#3B82F6] text-white hover:scale-[1.02]'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ---- Contact Info - 40% ---- */}
            <div className="lg:w-[40%]">
              <div className="space-y-6">
                <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
                  <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#059669] dark:bg-[#10B981] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📱</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#4B5563] dark:text-[#94A3B8]">Phone</p>
                        <p className="text-[#111827] dark:text-[#E2E8F0]">+20 0100 054 2676</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📍</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#4B5563] dark:text-[#94A3B8]">Location</p>
                        <p className="text-[#111827] dark:text-[#E2E8F0]">Egypt</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F9FC] dark:bg-[#121629] p-6 rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
                  <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-4">
                    Quick Response
                  </h3>
                  <ul className="space-y-2 text-[#4B5563] dark:text-[#94A3B8]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#2563EB] dark:text-[#4A7CFE]">✓</span>
                      <span>Response within 24 hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2563EB] dark:text-[#4A7CFE]">✓</span>
                      <span>Professional consultation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2563EB] dark:text-[#4A7CFE]">✓</span>
                      <span>Project estimation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2563EB] dark:text-[#4A7CFE]">✓</span>
                      <span>Technical support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact