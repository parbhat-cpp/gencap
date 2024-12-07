import axios from "axios";
import { ApiResponse } from "../lib/ApiResponse";

const aiBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/ai`;

export const generateCaptions = async (objectKey: string, captionLength: string, userPrompt: string): Promise<ApiResponse> => {
    try {
        const generateCaptionsUrl = `${aiBaseUrl}/generate-captions`;

        const captionsResponseData = await axios.post(generateCaptionsUrl, {
            'image-name': objectKey,
            'caption-length': captionLength,
            'user-prompt': userPrompt
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const captionsResponse: ApiResponse = captionsResponseData.data as ApiResponse;

        return captionsResponse;
    } catch (error) {
        return {
            data: null,
            error: error?.toString(),
            status_code: 500,
        }
    }
}
