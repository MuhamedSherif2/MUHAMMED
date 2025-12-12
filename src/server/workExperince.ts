import type { IWorkExperince , IApiResponse } from "../interfaces/server";
import api from "./api";


export const getWorkExperince = async (): Promise<IApiResponse<IWorkExperince[]>> => {
    const res = await api.get('/workexperince')
    return res.data
}

export const addWorkExperince = async (token: string, formData: FormData): Promise<IApiResponse<IWorkExperince>> => {
    const res = await api.post('/workexperince/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const updateWorkExperince = async (id: string, token: string, formData: FormData): Promise<IApiResponse<IWorkExperince>> => {
    const res = await api.put(`/workexperince/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const deleteWorkExperince = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/workexperince/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}