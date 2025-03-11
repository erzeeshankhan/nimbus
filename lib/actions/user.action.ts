"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";


// This is a server components that contains : 
// **Create account flow** - This is the flow that will be used to create a new user account in the appwrite server
// Steps below:
// - user enters full name and email
// -check if the user already exists in the appwrite server using the email
// -send OTP to the user email
// -this will send a secret key for creating a session 
// -create a new user documetn if user is a new user 
// -Return the user accountId that will be used to complete the login 
// -verify the OTP and authenticate to login 



const getUserByEmail = async (email: string) => {
    // getting access to the databases
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
}
// Handle error function
const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    throw error;
}
// Helper function to send email OTP
const sendEmailOTP = async ({ email }: { email: string }) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);

        if (!session?.userId) {
            throw new Error("Failed to generate user ID");
        }

        return session.userId;
    } catch (error) {
        handleError(error, "Failed to send email OTP");
    }
};



// Creating a new server action 
export const createAccount = async ({ fullName, email }: { fullName: string, email: string }) => {

    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });
    if (!accountId) {
        throw new Error("Failed to send email OTP");
    };

    if (existingUser) {
        const { databases } = await createAdminClient();

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                accountId,
            }
        );
    }

    return parseStringify({ accountId });
}