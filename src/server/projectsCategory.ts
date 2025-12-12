import api from "./api";
import type { IApiResponse, ICategory } from "../interfaces/server";

export const getProjectsCategory = async (): Promise<IApiResponse<ICategory[]>> => {
    const res = await api.get('/projectcategory')
    return res.data
}

export const addProjectsCategory = async (token: string, data: { title: string }) => {
    const res = await api.post('/projectcategory/add', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}


export const deleteProjectsCategory = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/projectcategory/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}