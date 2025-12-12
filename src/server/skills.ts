import api from "./api";
import type { ISkills, IApiResponse } from "../interfaces/server";

export const getSkills = async (): Promise<IApiResponse<ISkills[]>> => {
    const res = await api.get('/skills')
    return res.data
}

export const addSkill = async (token: string, formData: FormData): Promise<IApiResponse<ISkills>> => {
    const res = await api.post('/skills/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const updateSkill = async (id: string, token: string, formData: FormData): Promise<IApiResponse<ISkills>> => {
    const res = await api.put(`/skills/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const deleteSkill = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/skills/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}