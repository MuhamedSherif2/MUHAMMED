import Cover from './Cover'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Contact from './Contact'
import Certification from './Certification'
import Testimonials from './Testimonials'
import UniqueProject from './projects/UniqueProject'
import Services from './Services'
import WorkExperience from './WorkExperience'

function Home() {
  return (
    <>
      <Cover />
      <AboutMe />
      <Skills />
      <UniqueProject />
      <WorkExperience />
      <Services />
      <Certification />
      <Testimonials />
      <Contact />
    </>
  )
}

export default Home
