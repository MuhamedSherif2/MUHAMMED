import type { IProject } from "../../interfaces/server";

// Images
import bazookaImg from "../../assets/projectIMG/bazooka.png"
import blacksoulImg from "../../assets/projectIMG/blacksoul.png"
import watchitImg from "../../assets/projectIMG/watchIt.png"
import crudImg from "../../assets/projectIMG/crud.png"
import trustdealImg from "../../assets/projectIMG/trust_deal.png"

// Front_End Skills
// import html5Img from '../../assets/skills/html.png'
// import css3Img from '../../assets/skills/css.png'
// import bootstrapImg from '../../assets/skills/bootstrap.png'
import tailwindImg from '../../assets/skills/tailwind.png'
// import SassImg from '../../assets/skills/Sass.png'
// import JavaScriptImg from '../../assets/skills/JavaScript.png'
import typescriptImg from '../../assets/skills/typescript.png'
import reactImg from '../../assets/skills/react.png'
// import nextjsImg from '../../assets/skills/nextjs.png'

// Back_End Skills
import nodeImg from '../../assets/skills/node.png'
import expressImg from '../../assets/skills/express.png'
// import nestjsImg from '../../assets/skills/nestjs.png'

// Database Skills
import mongooImg from '../../assets/skills/mongo db.png'
// import postgresqlImg from '../../assets/skills/postgresql.png'

export const ProjectStatic: IProject[] = [
  // Bazooka Colon Project
  {
    _id: "1",

    title: "Bazooka Colon",

    overview:
      "Bazooka Colon is a dynamic and interactive web application developed during my intensive training program. Built with modern frontend technologies, this project showcases my ability to create responsive user interfaces and manage complex application state efficiently. The application demonstrates practical implementation of React.js components styled with Tailwind CSS, while utilizing React Context API for seamless state management across the entire application.",

    keyFeatures:
      "Responsive Design: Fully responsive layout using Tailwind CSS, ensuring optimal viewing on all devices.Centralized State Management: Implemented React Context API to handle global state, reducing prop drilling and improving code maintainability.Modular Component Architecture: Built reusable and scalable React components following best practices.Real - time Interactivity: Features dynamic user interactions with immediate visual feedback. Clean & Modern UI: Polished interface with consistent styling and intuitive user experience.",

    highlights:
      "Successfully architected and developed the entire project independently during the training period.Effectively utilized React Hooks alongside Context API to manage and share state across multiple components.Demonstrated proficiency in Tailwind CSS by creating a custom, visually appealing design system.Implemented efficient component lifecycle management to optimize performance.The project served as a comprehensive hands-on experience in building a complete React application from concept to execution.",

    projectType: "Capstone Project",

    image: bazookaImg,

    category: {
      _id: "1",
      title: "Front-End",
    },

    skills: [
      {
        _id: "1",
        title: "React",
        image: reactImg,
      },
    ],

    hot: true,

    githubFront: "https://github.com/MuhamedSherif2/Task5-Devwave",

    demo: "https://task5-devwave.vercel.app/",
  },

  // Blacksoul.eg Project
  {
    _id: "2",

    title: "Blacksoul.eg",

    overview:
      "Developed a modern, visually striking e-commerce platform for NovaWear, an emerging fashion brand specializing in unique, statement clothing pieces. The website was designed to showcase the brand's distinctive identity while providing an intuitive shopping experience that captures the essence of wearing something truly different.",

    keyFeatures:
      "Immersive product gallery with high-resolution zoom and 360° view capability. Style Match recommendation engine suggesting complementary items. Dynamic lookbook section showcasing curated outfits and styling ideas. Real-time inventory indicators for limited-edition pieces. Integrated newsletter subscription with immediate confirmation. Contact form connected directly to brand management via EmailJS",

    highlights:
      "Frontend: React.js with TypeScript for type-safe, maintainable code. Styling: Tailwind CSS for rapid, responsive UI development. Email Integration: EmailJS for handling customer inquiries without backend. State Management: React Context API for cart and user preferences. Performance: Implemented lazy loading and image optimization. Built a custom product filtering system allowing combination filters (color + size + style). Implemented smooth animations and transitions using Framer Motion. Created a fully responsive design that maintains visual impact on all devices. Developed reusable TypeScript components ensuring consistency across pages.",

    projectType: "Capstone Project",

    image: blacksoulImg,

    category: {
      _id: "1",
      title: "Front-End",
    },

    skills: [
      {
        _id: "1",
        title: "React",
        image: reactImg,
      },
      {
        _id: "2",
        title: "Tailwind CSS",
        image: tailwindImg,
      },
      {
        _id: "3",
        title: "TypeScript",
        image: typescriptImg,
      },
    ],

    hot: true,

    githubFront: "https://github.com/MuhamedSherif2/BLACKSOUL",

    demo: "https://blacksoul-two.vercel.app/",
  },

  // WatchIt Project
  {
    _id: "3",

    title: "WatchIt - Movie Discovery Platform",

    overview:
      "Feature-rich movie platform for discovering and tracking films. Solves the problem of forgetting movie recommendations with personalized watchlists.",

    keyFeatures:
      "Smart movie discovery & personalized watchlists. Advanced search with filtering by genre/year/rating. User authentication & interactive rating system. Fully responsive design",

    highlights:
      "Implemented real-time sync with Firebase Firestore. Achieved 95+ Lighthouse performance score. Successfully presented as capstone project",


    projectType: "Capstone Project",

    image: watchitImg,

    category: {
      _id: "1",
      title: "Front-End",
    },

    skills: [
      {
        _id: "1",
        title: "React",
        image: reactImg,
      },
      {
        _id: "2",
        title: "Tailwind CSS",
        image: tailwindImg,
      },
      {
        _id: "3",
        title: "TypeScript",
        image: typescriptImg,
      },
    ],

    hot: true,

    githubFront: "https://github.com/MuhamedSherif2/WATCH-IT-Clone",

    demo: "https://egybest-clone-alpha.vercel.app/",
  },

  // Crud Project
  {
    _id: "4",

    title: "CRUD Project",

    overview:
      "Developed a modern, visually striking e-commerce platform for NovaWear, an emerging fashion brand specializing in unique, statement clothing pieces. The website was designed to showcase the brand's distinctive identity while providing an intuitive shopping experience that captures the essence of wearing something truly different.",

    keyFeatures:
      "Immersive product gallery with high-resolution zoom and 360° view capability. Style Match recommendation engine suggesting complementary items. Dynamic lookbook section showcasing curated outfits and styling ideas. Real-time inventory indicators for limited-edition pieces. Integrated newsletter subscription with immediate confirmation. Contact form connected directly to brand management via EmailJS",

    highlights:
      "Frontend: React.js with TypeScript for type-safe, maintainable code. Styling: Tailwind CSS for rapid, responsive UI development. Email Integration: EmailJS for handling customer inquiries without backend. State Management: React Context API for cart and user preferences. Performance: Implemented lazy loading and image optimization. Built a custom product filtering system allowing combination filters (color + size + style). Implemented smooth animations and transitions using Framer Motion. Created a fully responsive design that maintains visual impact on all devices. Developed reusable TypeScript components ensuring consistency across pages.",

    projectType: "Capstone Project",

    image: crudImg,

    category: {
      _id: "1",
      title: "Front-End",
    },

    skills: [
      {
        _id: "1",
        title: "React-JS",
        image: reactImg,
      },
      {
        _id: "2",
        title: "Tailwind-CSS",
        image: tailwindImg,
      },
      {
        _id: "3",
        title: "TypeScript",
        image: typescriptImg,
      },
    ],

    hot: true,

    githubFront: "https://github.com/MuhamedSherif2/CRUD-ts",

    demo: "https://crud-ts-psi.vercel.app/",
  },

  // daar block chain Project
  {
    _id: "5",

    title: "D'AR Blockchain Hackathon Project",

    overview:
      "Built a decentralized freelance platform on blockchain technology that escrows payments through smart contracts, ensuring security for both clients and freelancers. Developed during the D'AR Blockchain Hackathon to solve payment trust issues in traditional freelancing.",

    keyFeatures:
      "Smart contract-based payment escrow system. Automated fund release after 48-hour work delivery verification. Client project posting with upfront payment locking. Freelancer work submission and approval mechanism. Transparent transaction history on blockchain.",

    highlights:
      "Dual Problem Solver: Eliminates freelancer payment delays (48hr vs weeks) + prevents client payment fraud. Trustless System: Smart contracts automatically handle funds, removing need for third-party intermediaries. Hackathon Innovation: Developed core MVP within hackathon timeframe. Future-Ready Architecture: Designed for token-based ownership transition between freelancers and clients.",

    projectType: "Capstone Project",

    image: trustdealImg,

    category: {
      _id: "1",
      title: "MEAN Stack",
    },

    skills: [
      {
        _id: "1",
        title: "Angular-JS",
        image: reactImg,
      },
      {
        _id: "2",
        title: "Tailwind-CSS",
        image: tailwindImg,
      },
      {
        _id: "3",
        title: "TypeScript",
        image: typescriptImg,
      },
      {
        _id: "4",
        title: "Node-JS",
        image: nodeImg,
      },
      {
        _id: "5",
        title: "Express-js",
        image: expressImg,
      },
      {
        _id: "6",
        title: "Mongoo DB",
        image: mongooImg,
      },
    ],

    hot: true,

    githubFront: "https://github.com/Abdulrahman-Hekal/TrustDeal",

    demo: "https://www.linkedin.com/posts/muhamed-sherif_freelancing-web3-angular-activity-7393395317121081344-TlfD",
  },

  // Blacksoul.eg Project
  // {
  //   _id: "2",

  //   title: "Blacksoul.eg",

  //   overview:
  //     "Developed a modern, visually striking e-commerce platform for NovaWear, an emerging fashion brand specializing in unique, statement clothing pieces. The website was designed to showcase the brand's distinctive identity while providing an intuitive shopping experience that captures the essence of wearing something truly different.",

  //   keyFeatures:
  //     "Immersive product gallery with high-resolution zoom and 360° view capability. Style Match recommendation engine suggesting complementary items. Dynamic lookbook section showcasing curated outfits and styling ideas. Real-time inventory indicators for limited-edition pieces. Integrated newsletter subscription with immediate confirmation. Contact form connected directly to brand management via EmailJS",

  //   highlights:
  //     "Frontend: React.js with TypeScript for type-safe, maintainable code. Styling: Tailwind CSS for rapid, responsive UI development. Email Integration: EmailJS for handling customer inquiries without backend. State Management: React Context API for cart and user preferences. Performance: Implemented lazy loading and image optimization. Built a custom product filtering system allowing combination filters (color + size + style). Implemented smooth animations and transitions using Framer Motion. Created a fully responsive design that maintains visual impact on all devices. Developed reusable TypeScript components ensuring consistency across pages.",

  //   projectType: "Capstone Project",

  //   image: blacksoulImg,

  //   category: {
  //     _id: "1",
  //     title: "Front-End",
  //   },

  //   skills: [
  //     {
  //       _id: "1",
  //       title: "React",
  //       image: reactImg,
  //     },
  //     {
  //       _id: "2",
  //       title: "Tailwind CSS",
  //       image: tailwindImg,
  //     },
  //     {
  //       _id: "3",
  //       title: "TypeScript",
  //       image: typescriptImg,
  //     },
  //   ],

  //   hot: true,

  //   githubFront: "https://github.com/example/frontend",

  //   demo: "https://blacksoul-two.vercel.app/",
  // },

  // Blacksoul.eg Project
  // {
  //   _id: "2",

  //   title: "Blacksoul.eg",

  //   overview:
  //     "Developed a modern, visually striking e-commerce platform for NovaWear, an emerging fashion brand specializing in unique, statement clothing pieces. The website was designed to showcase the brand's distinctive identity while providing an intuitive shopping experience that captures the essence of wearing something truly different.",

  //   keyFeatures:
  //     "Immersive product gallery with high-resolution zoom and 360° view capability. Style Match recommendation engine suggesting complementary items. Dynamic lookbook section showcasing curated outfits and styling ideas. Real-time inventory indicators for limited-edition pieces. Integrated newsletter subscription with immediate confirmation. Contact form connected directly to brand management via EmailJS",

  //   highlights:
  //     "Frontend: React.js with TypeScript for type-safe, maintainable code. Styling: Tailwind CSS for rapid, responsive UI development. Email Integration: EmailJS for handling customer inquiries without backend. State Management: React Context API for cart and user preferences. Performance: Implemented lazy loading and image optimization. Built a custom product filtering system allowing combination filters (color + size + style). Implemented smooth animations and transitions using Framer Motion. Created a fully responsive design that maintains visual impact on all devices. Developed reusable TypeScript components ensuring consistency across pages.",

  //   projectType: "Capstone Project",

  //   image: blacksoulImg,

  //   category: {
  //     _id: "1",
  //     title: "Front-End",
  //   },

  //   skills: [
  //     {
  //       _id: "1",
  //       title: "React",
  //       image: reactImg,
  //     },
  //     {
  //       _id: "2",
  //       title: "Tailwind CSS",
  //       image: tailwindImg,
  //     },
  //     {
  //       _id: "3",
  //       title: "TypeScript",
  //       image: typescriptImg,
  //     },
  //   ],

  //   hot: true,

  //   githubFront: "https://github.com/example/frontend",

  //   demo: "https://blacksoul-two.vercel.app/",
  // },

];