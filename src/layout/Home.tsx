import Cover from './Cover'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Certification from './Certification'
// import Contact from './Contact'
// import Testimonials from './Testimonials'
// import UniqueProject from './projects/UniqueProject'
import Services from './Services'
import WorkExperience from './WorkExperience'
import AllProjects from './projects/AllProjects'

function Home() {
  return (
    <>
      <Cover />
      <AboutMe />
      <Skills />
      {/* <UniqueProject /> */}
      <AllProjects />
      <WorkExperience />
      <Services />
      <Certification />
      {/* <Testimonials />
      <Contact /> */}
    </>
  )
}

export default Home
