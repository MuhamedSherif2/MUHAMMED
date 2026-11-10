import AboutMe from "@/layout/AboutMe";
import Certification from "@/layout/Certification";
import Cover from "@/layout/Cover";
import FeaturedProjects from "@/layout/projects/UniqueProject";
import Services from "@/layout/Services";
import Skills from "@/layout/Skills";
// import Testimonials from "@/layout/Testimonials";
import WorkExperience from "@/layout/WorkExperience";

function Page() {
  return (
    <main>

      <Cover />
      <Skills />
      <FeaturedProjects />
      <Services />
      <WorkExperience />
      <AboutMe />
      {/* <Testimonials /> */}
      <Certification />
    </main>
  );
}

export default Page;