import api from './api';
import type { ICover, IApiResponse } from '../interfaces/server';

export const getCover = async (): Promise<IApiResponse<ICover[]>> => {
    const res = await api.get('/cover');
    return res.data;
};

export const addCover = async (token: string, formData: FormData): Promise<IApiResponse<ICover>> => {
    const res = await api.post('/cover/add', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateCover = async (id: string, token: string, formData: FormData): Promise<IApiResponse<ICover>> => {
    const res = await api.put(`/cover/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteCover = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/cover/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};