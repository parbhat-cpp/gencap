import axios from "axios";
import { ApiResponse } from "../lib/ApiResponse";

const baseImageUrl = `${import.meta.env.VITE_BACKEND_URL}/image`;

export const uploadImage = async (formdata: FormData): Promise<ApiResponse> => {
    try {
        const imageUploadUrl = `${baseImageUrl}/upload`;
        const imageUploadResponse = await axios.post(imageUploadUrl, formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const imageUploadResponseData: ApiResponse = imageUploadResponse.data as ApiResponse;

        return imageUploadResponseData;
    } catch (error) {
        return {
            data: null,
            error: error?.toString(),
            status_code: 500,
        }
    }
}

export const deleteImage = async (objectKey: string): Promise<ApiResponse> => {
    try {
        const deleteImageUrl = `${baseImageUrl}/delete`;

        const deleteImageResponseData = await axios.post(deleteImageUrl, {
            "object-key": objectKey,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const deleteImageResponse: ApiResponse = deleteImageResponseData.data as ApiResponse;

        return deleteImageResponse;
    } catch (error) {
        return {
            data: null,
            error: error?.toString(),
            status_code: 500,
        }
    }
}
