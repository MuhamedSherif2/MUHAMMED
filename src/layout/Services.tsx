import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";

const Services = () => {
  const context = useContext(Context);
  if (!context) return <div className="text-[#4B5563] dark:text-[#94A3B8]">Loading...</div>;

  const [loading, setLoading] = useState(true);
  const { services, portfolioActions } = context

  useEffect(() => {
    const loadData = async () => {
      try {
        await portfolioActions.loadServices?.();
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (!context || loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#2563EB] dark:border-[#4A7CFE] rounded-full"></div>
      </div>
    );
  }

  return (
    <section className='w-full bg-white dark:bg-[#0B0E1D] py-12'>
      <div className='w-full'>
        <div className='w-full max-w-6xl mx-auto px-6'>
          <h2 className='text-center font-bold text-3xl md:text-4xl text-[#111827] dark:text-[#E2E8F0] mb-3'>
            Services
          </h2>

          <p className="text-center text-[#4B5563] dark:text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto">
            Professional services I offer to clients
          </p>

          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item._id}
                  className="group bg-[#F8F9FC] dark:bg-[#121629] rounded-xl border border-[#F8F9FC] dark:border-[#121629] overflow-hidden hover:border-[#2563EB] dark:hover:border-[#4A7CFE] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Service Image */}
                  {item.image && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-3 group-hover:text-[#2563EB] dark:group-hover:text-[#4A7CFE] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-[#4B5563] dark:text-[#94A3B8] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F8F9FC] dark:border-[#121629]">
                      <span className="text-sm px-3 py-1 bg-[#D1E9FF] dark:bg-[#1E2235] text-[#2563EB] dark:text-[#4A7CFE] rounded-full font-medium">
                        Service
                      </span>
                      <span className="text-[#2563EB] dark:text-[#4A7CFE] group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FC] dark:bg-[#121629] rounded-2xl border border-[#F8F9FC] dark:border-[#121629]">
              <div className="w-20 h-20 bg-[#D1E9FF] dark:bg-[#1E2235] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#2563EB] dark:text-[#4A7CFE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] dark:text-[#E2E8F0] mb-2">
                No Services Available
              </h3>
              <p className="text-[#4B5563] dark:text-[#94A3B8] max-w-md mx-auto">
                Services will appear here once they are added to the portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
};

export default Services;

// import { useState, useEffect, useContext } from "react";
// import { Context } from "@/context";
// import { 
//   Globe, 
//   Code, 
//   Palette, 
//   ShoppingCart, 
//   BarChart3, 
//   Smartphone 
// } from "lucide-react";

// const Services = () => {
//   const context = useContext(Context);
//   const [loading, setLoading] = useState(true);
//   const { services, portfolioActions } = context || {};

//   useEffect(() => {
//     const loadData = async () => {
//       if (portfolioActions?.loadServices) {
//         try {
//           await portfolioActions.loadServices();
//         } catch (err) {
//           console.error("Failed to load services:", err);
//         }
//       }
//       setLoading(false);
//     };
//     loadData();
//   }, [portfolioActions]);

//   if (loading || !context) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <div className="animate-spin h-12 w-12 border-2 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent"></div>
//       </div>
//     );
//   }

//   // دالة لتقسيم النص الطويل إلى نقاط
//   const splitDescription = (description: string) => {
//     if (!description) return [];
    
//     // جرب كل أنواع الفواصل
//     const separators = ['\n', '. ', '- ', '• ', '* '];
    
//     for (const separator of separators) {
//       if (description.includes(separator)) {
//         return description.split(separator)
//           .map(item => item.trim())
//           .filter(item => item.length > 0);
//       }
//     }
    
//     // إذا كان النص طويلاً جداً، قسمه إلى جمل
//     return description.split('. ')
//       .map(item => item.trim())
//       .filter(item => item.length > 0);
//   };

//   // دالة للحصول على الأيقونة المناسبة
//   const getServiceIcon = (title: string) => {
//     const lowerTitle = title.toLowerCase();
    
//     if (lowerTitle.includes('full website') || lowerTitle.includes('website')) {
//       return <Globe className="w-6 h-6" />;
//     }
//     if (lowerTitle.includes('interactive') || lowerTitle.includes('web app')) {
//       return <Code className="w-6 h-6" />;
//     }
//     if (lowerTitle.includes('ui/ux') || lowerTitle.includes('design')) {
//       return <Palette className="w-6 h-6" />;
//     }
//     if (lowerTitle.includes('e-commerce') || lowerTitle.includes('shop')) {
//       return <ShoppingCart className="w-6 h-6" />;
//     }
//     if (lowerTitle.includes('admin') || lowerTitle.includes('dashboard')) {
//       return <BarChart3 className="w-6 h-6" />;
//     }
//     if (lowerTitle.includes('responsive') || lowerTitle.includes('mobile')) {
//       return <Smartphone className="w-6 h-6" />;
//     }
//     return <Code className="w-6 h-6" />;
//   };

//   // دالة للحصول على اللون المناسب
//   const getServiceColor = (title: string) => {
//     const lowerTitle = title.toLowerCase();
    
//     if (lowerTitle.includes('full website') || lowerTitle.includes('website')) {
//       return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
//     }
//     if (lowerTitle.includes('interactive') || lowerTitle.includes('web app')) {
//       return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
//     }
//     if (lowerTitle.includes('ui/ux') || lowerTitle.includes('design')) {
//       return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
//     }
//     if (lowerTitle.includes('e-commerce') || lowerTitle.includes('shop')) {
//       return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
//     }
//     if (lowerTitle.includes('admin') || lowerTitle.includes('dashboard')) {
//       return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400";
//     }
//     if (lowerTitle.includes('responsive') || lowerTitle.includes('mobile')) {
//       return "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
//     }
//     return "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400";
//   };

//   // إذا لم توجد خدمات من الـ API، استخدم البيانات الافتراضية
//   const displayServices = services && services.length > 0 
//     ? services 
//     : [
//         {
//           _id: "1",
//           title: "Full Website Development",
//           description: "From concept to launch\nComplete web solutions\nProfessional design and development\nEnd-to-end project management"
//         },
//         {
//           _id: "2",
//           title: "Interactive Web Applications",
//           description: "Dynamic & engaging web apps\nReal-time features\nModern frameworks\nUser-friendly interfaces"
//         },
//         {
//           _id: "3",
//           title: "Custom UI/UX Design",
//           description: "User-centered design\nBeautiful interfaces\nUsability focused\nWireframing and prototyping"
//         },
//         {
//           _id: "4",
//           title: "E-commerce Solutions",
//           description: "Online stores\nSecure payment integration\nShopping cart functionality\nInventory management"
//         },
//         {
//           _id: "5",
//           title: "Admin Dashboard & Control Panels",
//           description: "Data visualization\nManagement systems\nIntuitive interfaces\nReal-time analytics"
//         },
//         {
//           _id: "6",
//           title: "Responsive Web Design",
//           description: "Mobile-first approach\nCross-device compatible\nOptimized for all screens\nFast loading speeds"
//         }
//       ];

//   return (
//     <section className='w-full bg-white dark:bg-gray-900 py-12 md:py-16'>
//       <div className='max-w-6xl mx-auto px-4'>
//         <div className='text-center mb-10'>
//           <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-3'>
//             Services
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Professional services I offer to clients
//           </p>
//         </div>

//         {displayServices.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayServices.map((item) => {
//               const points = splitDescription(item.description);
              
//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//                 >
//                   {/* Service Icon and Title */}
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className={`p-3 rounded-lg ${getServiceColor(item.title)}`}>
//                       {getServiceIcon(item.title)}
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                       {item.title}
//                     </h3>
//                   </div>

//                   {/* Service Points */}
//                   {points.length > 0 && (
//                     <ul className="space-y-2 mb-6">
//                       {points.map((point, index) => (
//                         <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
//                           <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">•</span>
//                           <span>{point}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}

//                   {/* Service Image */}
//                   {item.image && (
//                     <div className="mb-6 rounded-lg overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-40 object-cover"
//                       />
//                     </div>
//                   )}

//                   {/* Service Tag */}
//                   <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getServiceColor(item.title)}`}>
//                       Service
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
//             <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//               No Services Available
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300">
//               Services will appear here once they are added to the portfolio.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Services;