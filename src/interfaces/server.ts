export interface ICategory {
    _id: string;
    title: string;
}

export interface IAboutMe {
    _id: string;
    experience: string;
    uniquePoint: string;
    careerGoals: string;
}

export interface ICertifications {
    _id: string;
    certificateTitle: string;
    platform: string;
    year: string;
    certificateImage: string;
}

export interface ICover {
    _id: string;
    name: string;
    title: string;
    shortTagline: string;
    photo: string;
    callToAction: string;
}

export interface IProject {
    _id: string;
    slug: string;
    title: string;
    overview: string;
    keyFeatures: string[];
    highlights: string[];
    projectType: string;
    image: string;
    category: ICategory;
    skills: string[];
    hot: boolean;
    githubFront?: string;
    githubBack?: string;
    demo: string;
}

export interface IServices {
    _id: string;
    title: string;
    description: string;
    points: string[];
    image?: string;
}

export interface ISkills {
    _id: string;
    title: string;
    image: string;
    category: ICategory;
}

export interface ITestimonials {
    _id: string;
    authorName: string;
    authorRole?: string;
    message: string;
}

export interface IWorkExperince {
    _id: string;
    type: string;
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    description: string;
    certificate?: string;
}