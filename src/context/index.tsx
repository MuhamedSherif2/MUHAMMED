import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../server/api";
import { createPortfolioActions } from "../hooks/usePortfolioActions";
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
  ILoginResponse,
  IApiResponse,
} from "../interfaces/server";

import {AboutMeStatic} from './data/AboutMe'
import {CertificationStatic} from './data/Certification'
import {CoverStatic} from './data/Cover'
import {ProjectStatic} from './data/Project'
import {SkillsStatic} from './data/Skills'
import {ServicesStatic} from './data/Services'
import {WorkExperinceStatic} from './data/WorkExperience'

interface IContext {
  theme: string;
  toggleTheme: () => void;
  selectProject: string | null;
  setSelectProject: React.Dispatch<React.SetStateAction<string | null>>;  

  aboutMe: IAboutMe | null;
  certifications: ICertifications[];
  cover: ICover | null;
  projects: IProject[];
  uniqueProjects: IProject[];
  projectCategories: ICategory[];
  services: IServices[];
  skills: ISkills[];
  skillsCategory: ICategory[];
  testimonials: ITestimonials[];
  workExperince: IWorkExperince[];
  showTestimonials: ITestimonials[];

  setAboutMe: React.Dispatch<React.SetStateAction<IAboutMe | null>>;
  setCertifications: React.Dispatch<React.SetStateAction<ICertifications[]>>;
  setCover: React.Dispatch<React.SetStateAction<ICover | null>>;
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  setUniqueProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  setProjectCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setServices: React.Dispatch<React.SetStateAction<IServices[]>>;
  setSkills: React.Dispatch<React.SetStateAction<ISkills[]>>;
  setSkillsCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setTestimonials: React.Dispatch<React.SetStateAction<ITestimonials[]>>;
  setWorkExperince: React.Dispatch<React.SetStateAction<IWorkExperince[]>>;
  setShowTestimonials: React.Dispatch<React.SetStateAction<ITestimonials[]>>;

  portfolioActions: ReturnType<typeof createPortfolioActions>;

  login: (email: string, password: string) => Promise<void>;
  userToken: string | null;

  sendMessage: (data: FormData) => Promise<void>;
}

export const Context = createContext<IContext | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [selectProject, setSelectProject] = useState<string | null>(null);

  const [aboutMe, setAboutMe] = useState<IAboutMe | null>(AboutMeStatic);
  const [certifications, setCertifications] = useState<ICertifications[]>(CertificationStatic);
  const [cover, setCover] = useState<ICover | null>(CoverStatic);
  const [projects, setProjects] = useState<IProject[]>(ProjectStatic);
  const [uniqueProjects, setUniqueProjects] = useState<IProject[]>([]);
  const [projectCategories, setProjectCategories] = useState<ICategory[]>([]);
  const [services, setServices] = useState<IServices[]>(ServicesStatic);
  const [skills, setSkills] = useState<ISkills[]>(SkillsStatic);
  const [skillsCategory, setSkillsCategory] = useState<ICategory[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonials[]>([]);
  const [workExperince, setWorkExperince] = useState<IWorkExperince[]>(WorkExperinceStatic);
  const [showTestimonials, setShowTestimonials] = useState<ITestimonials[]>([]);

  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("token"));

  const portfolioActions = createPortfolioActions(
    setAboutMe,
    setCertifications,
    setCover,
    setProjects,
    setUniqueProjects,
    setProjectCategories,
    setServices,
    setSkills,
    setSkillsCategory,
    setTestimonials,
    setWorkExperince,
    setShowTestimonials
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post<IApiResponse<ILoginResponse>>("/login", { email, password });
      if (res.data.data?.token) {
        setUserToken(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
      } else {
        setUserToken(null);
        localStorage.removeItem("token");
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setUserToken(null);
      localStorage.removeItem("token");
      throw err;
    }
  };

  const sendMessage = async (data: FormData) => {
    try {
      await portfolioActions.sendMessage(data);
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.error("❌ Error sending message:", error);
      throw error;
    }
  };

  return (
    <Context.Provider
      value={{
        theme,
        toggleTheme,
        aboutMe,
        certifications,
        cover,
        projects,
        uniqueProjects,
        projectCategories,
        services,
        skills,
        skillsCategory,
        testimonials,
        workExperince,
        showTestimonials,
        
        setAboutMe,
        setCertifications,
        setCover,
        setProjects,
        setUniqueProjects,
        setProjectCategories,
        setServices,
        setSkills,
        setSkillsCategory,
        setTestimonials,
        setWorkExperince,
        setShowTestimonials,
        
        portfolioActions,
        login,
        userToken,
        sendMessage,
        selectProject , 
        setSelectProject
      }}
    >
      {children}
    </Context.Provider>
  );
};