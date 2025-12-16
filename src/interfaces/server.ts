export interface IApiResponse<T> {
    message: string;
    data: T;
}

export interface IAboutMe {
    _id: string;
    experience: string;
    uniquePoint: string;
    careerGoals: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICertifications {
    _id: string;
    certificateTitle: string;
    platform: string;
    year: string;
    certificateImage: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IContact {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICover {
    _id: string;
    name: string;
    title: string;
    shortTagline: string;
    photo: string;
    callToAction: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILoginResponse {
    message: string;
    token: string;
    user: {
        username: string;
        email: string;
        role: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface IProject {
    _id: string;
    title: string;
    overview: string;
    keyFeatures: string;
    highlights: string;
    projectType: string;
    image: string;
    category:ICategory;
    skills: IProjectSkill[];
    hot: boolean;
    githubFront: string;
    githubBack: string;
    demo: string;
}

export interface IProjectSkill {
    _id: string;
    title: string;
    image: string;
}

export interface IServices {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ISkills {
    _id: string;
    skill_name: string;
    skill_icon?: string;
    category: ICategory;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITestimonials {
    _id: string;
    authorName: string;
    authorEmail: string;
    message: string;
    isShow: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface IWorkExperince {
    _id: string;
    type: string;
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    description: string;
    certificate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICategory {
    _id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
}