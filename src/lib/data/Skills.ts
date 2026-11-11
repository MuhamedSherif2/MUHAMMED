import { ISkills } from '@/interfaces/server'

export const SkillsStatic: ISkills[] = [
  { _id: 'html', title: 'HTML 5', image: "/skills/html.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'css', title: 'CSS 3', image: "/skills/css.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'bootstrap', title: 'Bootstrap', image: "/skills/bootstrap.png", category: { _id: '1', title: 'Front-End', }, },
  { _id: 'tailwind', title: 'Tailwind CSS', image: "/skills/tailwind.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'javascript', title: 'JavaScript', image: "/skills/JavaScript.png", category: { _id: '1', title: 'Front-End', }, },
  { _id: 'typescript', title: 'TypeScript', image: "/skills/typescript.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'react', title: 'React.js', image: "/skills/react.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'nextjs', title: 'Next.js', image: "/skills/nextjs.png", category: { _id: '1', title: 'Front-End' } },
  { _id: 'angular', title: 'Angular', image: "/skills/angular-new.webp", category: { _id: '1', title: 'Front-End' } },
  { _id: 'node', title: 'Node.js', image: "/skills/node.png", category: { _id: '2', title: 'Back-End' } },
  { _id: 'express', title: 'Express.js', image: "/skills/express.png", category: { _id: '2', title: 'Back-End' } },
  { _id: 'nest', title: 'NestJS', image: "/skills/nestjs.png", category: { _id: '2', title: 'Back-End', }, },
  { _id: 'mongodb', title: 'MongoDB', image: "/skills/mongodb.png", category: { _id: '3', title: 'Database' } },
  { _id: 'postgresql', title: 'PostgreSQL', image: "/skills/postgresql.png", category: { _id: '3', title: 'Database', }, },
]