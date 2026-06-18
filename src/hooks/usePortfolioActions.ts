import { sendMassege } from "../server/contact";
import { addCover, deleteCover, getCover, updateCover } from "../server/cover";
import { addAboutMe, getAboutMe, deleteAboutMe, updateAboutMe } from "../server/aboutMe";
import { addCertification, deleteCertification, getCertifications, updateCertification, } from "../server/certifications";
import { addProject, deleteProject, getProjects, updateProject, getHotProjects, } from "../server/projects";
import { addProjectsCategory, deleteProjectsCategory, getProjectsCategory, } from "../server/projectsCategory";
import { addService, deleteService, getServices, updateService, } from "../server/services";
import { addSkill, deleteSkill, getSkills, updateSkill, } from "../server/skills";
import { addSkillsCategory, deleteSkillsCategory, getSkillsCategory, updateSkillsCategory, } from "../server/skillsCategory";
import { addTestimonial, deleteTestimonial, getShowTestimonials, getTestimonials, updateTestimonial, } from "../server/testimonials";
import { addWorkExperince, deleteWorkExperince, getWorkExperince, updateWorkExperince, } from "../server/workExperince";

import type {
    IAboutMe,
    ICertifications,
    ICover,
    IProject,
    ICategory,
    IServices,
    ISkills,
    ITestimonials,
    IWorkExperince,
} from "../interfaces/server";


export const createPortfolioActions = (
    setAboutMe: React.Dispatch<React.SetStateAction<IAboutMe | null>>,
    setCertifications: React.Dispatch<React.SetStateAction<ICertifications[]>>,
    setCover: React.Dispatch<React.SetStateAction<ICover | null>>,
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>,
    setUniqueProjects: React.Dispatch<React.SetStateAction<IProject[]>>,
    setProjectCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
    setServices: React.Dispatch<React.SetStateAction<IServices[]>>,
    setSkills: React.Dispatch<React.SetStateAction<ISkills[]>>,
    setSkillsCategory: React.Dispatch<React.SetStateAction<ICategory[]>>,
    setTestimonials: React.Dispatch<React.SetStateAction<ITestimonials[]>>,
    setWorkExperince: React.Dispatch<React.SetStateAction<IWorkExperince[]>>,
    setShowTestimonials: React.Dispatch<React.SetStateAction<ITestimonials[]>>
) => {
    // ABOUT ME
    const loadAboutMe = async () => {
        try {
            const res = await getAboutMe();

            if (res?.data) {
                setAboutMe(res.data);
            }
        } catch (error) {
            console.error("About API Error:", error);
        }
    };

    const addAbout = async (data: Partial<IAboutMe>, token: string) => {
        const res = await addAboutMe(data, token);
        setAboutMe(res.data);
    };

    const updateAbout = async (data: Partial<IAboutMe>, token: string) => {
        const res = await updateAboutMe(data, token);
        setAboutMe(res.data);
    };

    const deleteAbout = async (token: string) => {
        await deleteAboutMe(token);
        setAboutMe(null);
    };

    // CERTIFICATIONS
    const loadCertifications = async () => {
        try {
            const res = await getCertifications();

            if (res?.data?.length > 0) {
                setCertifications(res.data);
            }
        } catch (error) {
            console.error("Certifications API Error:", error);
        }
    };

    const addNewCertification = async (formData: FormData, token: string) => {
        const res = await addCertification(formData, token);
        setCertifications(prev => [...prev, res.data]);
    };

    const updateExistingCertification = async (id: string, formData: FormData, token: string) => {
        const res = await updateCertification(id, formData, token);
        setCertifications(prev => prev.map(c => c._id === id ? res.data : c));
    };

    const deleteExistingCertification = async (id: string, token: string) => {
        await deleteCertification(id, token);
        setCertifications(prev => prev.filter(c => c._id !== id));
    };

    // COVER
    const loadCover = async () => {
        try {
            const res = await getCover();

            const cover = res.data.length > 0 ? res.data[0] : null;

            if (cover) {
                setCover(cover);
            }
        } catch (error) {
            console.error("Cover API Error:", error);
        }
    };

    const addNewCover = async (token: string, formData: FormData) => {
        const res = await addCover(token, formData);
        setCover(res.data);
    };

    const updateExistingCover = async (id: string, token: string, formData: FormData) => {
        const res = await updateCover(id, token, formData);
        setCover(res.data);
    };

    const deleteExistingCover = async (id: string, token: string) => {
        await deleteCover(id, token);
        setCover(null);
    };

    // PROJECTS
    const loadProjects = async () => {
        try {
            const res = await getProjects();

            if (res?.data?.length > 0) {
                setProjects(res.data);
            }
        } catch (error) {
            console.error("Projects API Error:", error);
        }
    };

    const loadUniqueProjects = async () => {
        try {
            const res = await getHotProjects();

            if (res?.data?.length > 0) {
                setUniqueProjects(res.data);
            }
        } catch (error) {
            console.error("Hot Projects API Error:", error);
        }
    };

    const addNewProject = async (token: string, formData: FormData) => {
        const res = await addProject(token, formData);
        setProjects(prev => [res.data, ...prev]);
    };

    const updateExistingProject = async (id: string, token: string, formData: FormData) => {
        try {
            const res = await updateProject(id, token, formData);
            setProjects(prev =>
                prev.map(project => project._id === id ? { ...project, ...res.data } : project)
            );
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    };

    const deleteExistingProject = async (id: string, token: string) => {
        await deleteProject(id, token);
        setProjects(prev => prev.filter(p => p._id !== id));
    };

    // PROJECT CATEGORY
    const loadProjectCategories = async () => {
        try {
            const res = await getProjectsCategory();

            if (res?.data?.length > 0) {
                setProjectCategories(res.data);
            }
        } catch (error) {
            console.error("Project Categories API Error:", error);
        }
    };

    const addNewProjectCategory = async (token: string, data: { title: string }) => {
        const res = await addProjectsCategory(token, data);
        setProjectCategories(prev => [...prev, res.data]);
    };

    const deleteProjectCategory = async (id: string, token: string) => {
        await deleteProjectsCategory(id, token);
        setProjectCategories(prev => prev.filter(c => c._id !== id));
    };

    // SERVICES
    const loadServices = async () => {
        try {
            const res = await getServices();

            if (res?.data?.length > 0) {
                setServices(res.data);
            }
        } catch (error) {
            console.error("Services API Error:", error);
        }
    };

    const addNewService = async (token: string, formData: FormData) => {
        const res = await addService(token, formData);
        setServices(prev => [...prev, res.data]);
    };

    const updateExistingService = async (id: string, token: string, formData: FormData) => {
        const res = await updateService(id, token, formData);
        setServices(prev => prev.map(s => s._id === id ? res.data : s));
    };

    const deleteExistingService = async (id: string, token: string) => {
        await deleteService(id, token);
        setServices(prev => prev.filter(s => s._id !== id));
    };

    // SKILLS
    const loadSkills = async () => {
        try {
            const res = await getSkills();

            if (res?.data?.length > 0) {
                setSkills(res.data);
            }
        } catch (error) {
            console.error("Skills API Error:", error);
        }
    };

    const addNewSkill = async (token: string, formData: FormData) => {
        const res = await addSkill(token, formData);
        setSkills(prev => [...prev, res.data]);
    };

    const updateExistingSkill = async (id: string, token: string, formData: FormData) => {
        const res = await updateSkill(id, token, formData);
        setSkills(prev => prev.map(s => s._id === id ? res.data : s));
    };

    const deleteExistingSkill = async (id: string, token: string) => {
        await deleteSkill(id, token);
        setSkills(prev => prev.filter(s => s._id !== id));
    };

    // SKILLS CATEGORY
    const loadSkillsCategory = async () => {
        try {
            const res = await getSkillsCategory();

            if (res?.data?.length > 0) {
                setSkillsCategory(res.data);
            }
        } catch (error) {
            console.error("Skills Categories API Error:", error);
        }
    };

    const addNewSkillsCategory = async (token: string, formData: FormData) => {
        const res = await addSkillsCategory(token, formData);
        setSkillsCategory(prev => [...prev, res.data]);
    };

    const updateSkillsCategoryData = async (id: string, token: string, data: { title: string; }) => {
        try {
            const res = await updateSkillsCategory(id, token, data);
            if (res && res.data) {
                setSkillsCategory(prev => prev.map(c => c._id === id ? res.data : c));
            } else {
                loadSkillsCategory();
            }
        } catch (error) {
            console.error("Error in updateSkillsCategoryData:", error);
            throw error;
        }
    };

    const deleteSkillsCategoryData = async (id: string, token: string) => {
        await deleteSkillsCategory(id, token);
        setSkillsCategory(prev => prev.filter(c => c._id !== id));
    };

    // TESTIMONIALS
    const loadTestimonials = async () => {
        try {
            const res = await getTestimonials();

            if (res?.data?.length > 0) {
                setTestimonials(res.data);
            }
        } catch (error) {
            console.error("Testimonials API Error:", error);
        }
    };

    const loadShowTestimonials = async () => {
        try {
            const res = await getShowTestimonials();

            if (res?.data?.length > 0) {
                setShowTestimonials(res.data);
            }
        } catch (error) {
            console.error("Show Testimonials API Error:", error);
        }
    };

    const addNewTestimonial = async (formData: FormData) => {
        const res = await addTestimonial(formData);
        setTestimonials(prev => [...prev, res.data]);
        if (res.data.isShow) {
            setShowTestimonials(prev => [...prev, res.data]);
        }
    };

    const updateExistingTestimonial = async (id: string, formData: FormData) => {
        const res = await updateTestimonial(id, formData);
        setTestimonials(prev => prev.map(t => t._id === id ? res.data : t));

        setShowTestimonials(prev => {
            if (res.data.isShow) {
                const exists = prev.find(t => t._id === id);
                if (exists) {
                    return prev.map(t => t._id === id ? res.data : t);
                } else {
                    return [...prev, res.data];
                }
            } else {
                return prev.filter(t => t._id !== id);
            }
        });
    };

    const deleteExistingTestimonial = async (id: string) => {
        await deleteTestimonial(id);
        setTestimonials(prev => prev.filter(t => t._id !== id));
        setShowTestimonials(prev => prev.filter(t => t._id !== id));
    };

    // WORK EXPERIENCE
    const loadWorkExperince = async () => {
        try {
            const res = await getWorkExperince();

            if (res?.data?.length > 0) {
                setWorkExperince(res.data);
            }
        } catch (error) {
            console.error("Work Experience API Error:", error);
        }
    };

    const addNewWorkExperince = async (token: string, formData: FormData) => {
        const res = await addWorkExperince(token, formData);
        setWorkExperince(prev => [...prev, res.data]);
    };

    const updateExistingWorkExperince = async (id: string, token: string, formData: FormData) => {
        const res = await updateWorkExperince(id, token, formData);
        setWorkExperince(prev => prev.map(w => w._id === id ? res.data : w));
    };

    const deleteExistingWorkExperince = async (id: string, token: string) => {
        await deleteWorkExperince(id, token);
        setWorkExperince(prev => prev.filter(w => w._id !== id));
    };

    // CONTACT
    const sendMessage = async (data: FormData) => {
        await sendMassege(data);
    };

    return {
        loadAboutMe,
        addAbout,
        updateAbout,
        deleteAbout,

        loadCertifications,
        addNewCertification,
        updateExistingCertification,
        deleteExistingCertification,

        loadCover,
        addNewCover,
        updateExistingCover,
        deleteExistingCover,

        loadProjects,
        loadUniqueProjects,
        addNewProject,
        updateExistingProject,
        deleteExistingProject,

        loadProjectCategories,
        addNewProjectCategory,
        deleteProjectCategory,

        loadServices,
        addNewService,
        updateExistingService,
        deleteExistingService,

        loadSkills,
        addNewSkill,
        updateExistingSkill,
        deleteExistingSkill,

        loadSkillsCategory,
        addNewSkillsCategory,
        updateSkillsCategoryData,
        deleteSkillsCategoryData,

        loadTestimonials,
        loadShowTestimonials,
        addNewTestimonial,
        updateExistingTestimonial,
        deleteExistingTestimonial,

        loadWorkExperince,
        addNewWorkExperince,
        updateExistingWorkExperince,
        deleteExistingWorkExperince,

        sendMessage,
    };
};