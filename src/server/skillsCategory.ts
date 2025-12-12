import api from "./api";
import type { IApiResponse, ICategory } from "../interfaces/server";

export const getSkillsCategory = async (): Promise<IApiResponse<ICategory[]>> => {
    const res = await api.get('/skillscategory')
    return res.data
}

export const addSkillsCategory = async (token: string, formData: FormData): Promise<IApiResponse<ICategory>> => {
    const res = await api.post('/skillscategory/add', formData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateSkillsCategory = async (id: string, token: string, data: { title: string }): Promise<IApiResponse<ICategory>> => {
    const res = await api.put(`/skillscategory/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })  
    return res.data
}

export const deleteSkillsCategory = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/skillscategory/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}