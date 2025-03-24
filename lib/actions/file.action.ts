"use server";

import { UploadFileProps } from "@/types";
import { createAdminClient } from "../appwrite";

// Handle error function
const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    throw error;
}
// Upload file function
export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path,
}: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();

    try {
        const 
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
}