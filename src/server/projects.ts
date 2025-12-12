import api from './api';
import type { IProject, IApiResponse } from '../interfaces/server';

export const getProjects = async () => {
    try {
        const res = await api.get('/projects');
        return res.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const getHotProjects = async (): Promise<IApiResponse<IProject[]>> => {
    const res = await api.get('/projects/hot')
    return res.data
}

export const addProject = async (token: string, formData: FormData): Promise<IApiResponse<IProject>> => {
    const res = await api.post('/projects/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const updateProject = async (id: string, token: string, formData: FormData): Promise<IApiResponse<IProject>> => {
    const res = await api.put(`/projects/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const deleteProject = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/projects/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}
