"use server";

import { UploadFileProps } from "@/types";
import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType } from "../utils";

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
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        }
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
}