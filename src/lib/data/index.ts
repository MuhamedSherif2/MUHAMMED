import { SkillsStatic } from "./Skills";

export { AboutMeStatic } from "./AboutMe";
export { CertificationStatic } from "./Certification";
export { CoverStatic } from "./Cover";
export { ProjectStatic } from "./Project";
export { ServicesStatic } from "./Services";
export { SkillsStatic };
export { WorkExperinceStatic } from "./WorkExperience";

export const getSkillsByIds = (ids: string[]) =>
    ids
        .map((id) => SkillsStatic.find((s) => s._id === id))
        .filter((s): s is NonNullable<typeof s> => Boolean(s));