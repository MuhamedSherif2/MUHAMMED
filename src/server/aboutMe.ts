import api from './api';
import type { IAboutMe, IApiResponse } from '../interfaces/server';

const apiAboutMe = 'aboutme/'

export const getAboutMe = async (): Promise<IApiResponse<IAboutMe>> => {
    const res = await api.get(apiAboutMe);
    return res.data;
};

export const addAboutMe = async (data : Partial<IAboutMe>, token: string) => {
    const res = await api.post(`${apiAboutMe}add`, data, {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateAboutMe = async (data : Partial<IAboutMe>, token: string) => {
    const res = await api.put(`${apiAboutMe}update`, data, {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteAboutMe = async (token : string) => {
    const res = await api.delete(`${apiAboutMe}delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
