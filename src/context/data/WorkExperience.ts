import { IWorkExperince } from '../../interfaces/server'

// images
import devwaveImg from '../../assets/certification/devWave-frontend.png'
import ieeeImg from '../../assets/certification/ieee-frontend.png'

export const WorkExperinceStatic: IWorkExperince[] = [
  {
    _id: '1',
    type: 'internship',
    title: 'Front-End Intern',
    organization: 'DevWave',
    startDate: '1/7/2025',
    endDate: '1/8/2025',
    description: 'Completed intensive React.js training at DevWave, focusing on modern frontend development practices. Built responsive web applications with React, TypeScript, and Tailwind CSS. Gained hands-on experience in component architecture, state management, and API integration while working on real-world projects in a professional development environment.',
    certificate: devwaveImg,
  },

  {
    _id: '2',
    type: 'volunteering',
    title: 'Frontend Instructor',
    organization: 'IEEE Obour ',
    startDate: '1/10/2024',
    endDate: '1/7/2025',
    description: 'Volunteered as a frontend development instructor at IEEE Obour, guiding 20+ students in building their first websites. Taught fundamental web technologies including HTML, CSS, and JavaScript through hands-on projects and interactive sessions. Helped students develop practical skills in creating responsive, functional web pages from scratch.',
    certificate: ieeeImg,
  },
]

{/*
    {
  "type": "volunteering",
  "title": "Volunteer",
  "organization": "Resala Charity",
  "start_date": "2023-01",
  "end_date": "2023-04",
  "description": "Helped in organizing events and donation management.",
  "certificate": ""
    }

    {
  "type": "internship",
  "title": "Software Intern",
  "organization": "Vodafone",
  "start_date": "2023-07",
  "end_date": "2023-09",
  "description": "Worked with the engineering team on internal tools.",
  "certificate": "https://link-to-certificate.com"
}

    {
    "type": "work",
  "title": "Backend Developer",
  "organization": "TechCorp",
  "start_date": "2023-02",
  "end_date": "2023-10",
  "description": "Developed REST APIs using Node.js & MongoDB.",
  "certificate": ""
    }
    */}