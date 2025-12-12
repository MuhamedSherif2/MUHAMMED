import api from './api'
import type { IContact, IApiResponse } from '../interfaces/server'

export const sendMassege = async (formData: FormData): Promise<IApiResponse<IContact>> => {

    const res = await api.post("/contact", formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.data;
}