import api from "./api";
import type { IApiResponse, ICertifications } from "../interfaces/server";

export const getCertifications = async (): Promise<IApiResponse<ICertifications[]>> => {
    const res = await api.get("/certification");
    return res.data;
};

export const addCertification = async (formData: FormData, token: string): Promise<IApiResponse<ICertifications>> => {
    const res = await api.post("/certification/add", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateCertification = async (id: string, formData: FormData, token: string): Promise<IApiResponse<ICertifications>> => {
    const res = await api.put(`/certification/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteCertification = async (id: string, token: string): Promise<IApiResponse<null>> => {
    const res = await api.delete(`/certification/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};