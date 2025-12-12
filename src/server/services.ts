import api from "./api";
import type { IServices, IApiResponse } from "../interfaces/server";

export const getServices = async (): Promise<IApiResponse<IServices[]>> => {
    const res = await api.get('/services')
    return res.data
}

export const addService = async (token: string, formData: FormData): Promise<IApiResponse<IServices>> => {
    const res = await api.post('/services/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}   

export const updateService = async (id: string, token: string, formData: FormData): Promise<IApiResponse<IServices>> => {
    const res = await api.put(`/services/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const deleteService = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/services/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}