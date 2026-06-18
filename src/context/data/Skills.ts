import { ISkills } from '../../interfaces/server'

// Front_End
import html5 from '../../assets/skills/html.png'
import css3 from '../../assets/skills/css.png'
import bootstrap from '../../assets/skills/bootstrap.png'
import tailwind from '../../assets/skills/tailwind.png'
import Sass from '../../assets/skills/Sass.png'
import JavaScript from '../../assets/skills/JavaScript.png'
import typescript from '../../assets/skills/typescript.png'
import react from '../../assets/skills/react.png'
import nextjs from '../../assets/skills/nextjs.png'

// Back_End
import node from '../../assets/skills/node.png'
import express from '../../assets/skills/express.png'
import nestjs from '../../assets/skills/nestjs.png'

// Database
import mongo from '../../assets/skills/mongo db.png'
import postgresql from '../../assets/skills/postgresql.png'

export const SkillsStatic: ISkills[] = [
  // Front-End
  {
    _id: '1',
    title: 'HTML 5',
    image: html5,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '2',
    title: 'CSS 3',
    image: css3,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '3',
    title: 'Bootstrap',
    image: bootstrap,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '4',
    title: 'Tailwind CSS',
    image: tailwind,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '5',
    title: 'Sass',
    image: Sass,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '6',
    title: 'JavaScript',
    image: JavaScript,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '7',
    title: 'TypeScript',
    image: typescript,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '8',
    title: 'React.js',
    image: react,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },
  {
    _id: '9',
    title: 'Next.js',
    image: nextjs,
    category: {
      _id: '1',
      title: 'Front-End',
    },
  },

  // Back-End
  {
    _id: '10',
    title: 'Node.js',
    image: node,
    category: {
      _id: '2',
      title: 'Back-End',
    },
  },
  {
    _id: '11',
    title: 'Express.js',
    image: express,
    category: {
      _id: '2',
      title: 'Back-End',
    },
  },
  {
    _id: '12',
    title: 'NestJS',
    image: nestjs,
    category: {
      _id: '2',
      title: 'Back-End',
    },
  },

  // Database
  {
    _id: '13',
    title: 'MongoDB',
    image: mongo,
    category: {
      _id: '3',
      title: 'Database',
    },
  },
  {
    _id: '14',
    title: 'PostgreSQL',
    image: postgresql,
    category: {
      _id: '3',
      title: 'Database',
    },
  },
]