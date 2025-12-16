import api from "./api";
import type { ITestimonials, IApiResponse } from "../interfaces/server";

export const getTestimonials = async (): Promise<IApiResponse<ITestimonials[]>> => {
    const res = await api.get('/testimonials')
    return res.data
}

export const getShowTestimonials = async (): Promise<IApiResponse<ITestimonials[]>> => {
    const res = await api.get('/testimonials/get')
    return res.data
}

export const addTestimonial = async (formData: FormData): Promise<IApiResponse<ITestimonials>> => {
    const res = await api.post('/testimonials/add', formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.data
}

export const updateTestimonial = async (
    id: string,
    formData: FormData
): Promise<IApiResponse<ITestimonials>> => {
    const res = await api.put(
        `/testimonials/update/${id}`,
        formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    );

    return res.data;
};

export const deleteTestimonial = async (id: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/testimonials/delete/${id}`)
    return res.data
}