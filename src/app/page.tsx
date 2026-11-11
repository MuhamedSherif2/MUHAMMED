import AnimatedContent from "@/components/AnimatedContent";
import AboutMe from "@/layout/AboutMe";
import Certification from "@/layout/Certification";
import Cover from "@/layout/Cover";
import FeaturedProjects from "@/layout/projects/UniqueProject";
import Services from "@/layout/Services";
import Skills from "@/layout/Skills";
import WorkExperience from "@/layout/WorkExperience";

const animation = {
  distance: 40,
  direction: "vertical" as const,
  duration: 1,
  ease: "power3.out",
  blur: 12,
  threshold: 0.1,
};

function Page() {
  return (
    <main>
      <Cover />

      <AnimatedContent {...animation}>
        <Skills />
      </AnimatedContent>

      <AnimatedContent {...animation}>
        <FeaturedProjects />
      </AnimatedContent>

      <AnimatedContent {...animation}>
        <Services />
      </AnimatedContent>

      <AnimatedContent {...animation}>
        <WorkExperience />
      </AnimatedContent>

      <AnimatedContent {...animation}>
        <AboutMe />
      </AnimatedContent>

      {/* <Testimonials /> */}

      <AnimatedContent {...animation}>
        <Certification />
      </AnimatedContent>
    </main>
  );
}

export default Page;