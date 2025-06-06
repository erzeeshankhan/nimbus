"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
// import { verify } from "crypto";
import { cookies } from "next/headers";
// import { parse } from "postcss";
import { redirect } from "next/navigation";


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
export const sendEmailOTP = async ({ email }: { email: string }) => {
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

    if (!existingUser) {
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


// Verify secret code action below
export const verifySecret = async ({ accountId, password }: { accountId: string, password: string }) => {
    
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(accountId, password);

        // Beloq is the code to set the session cookie, some precautions are taken to ensure the cookie is secure
        (await cookies()).set('appwrite.session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify({sessionId: session.$id});
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }

}

// Function to fetch the current user 
export const getCurrentUser = async () => {
    try {
      const { databases, account } = await createSessionClient();
  
      const result = await account.get();
  
      const user = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accountId", result.$id)],
      );
  
      if (user.total <= 0) return null;
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error);
    }
  };

// Function to sign out the user
export const signOutUser = async () => {
    const { account  } = await createSessionClient();

    try {
        // Delete the current session 
        await account.deleteSession('current');
        (await cookies()).delete('appwrite-session');
    }catch (error) {
        handleError(error, "Failed to sign out user");
    }finally {
        redirect('/sign-in');
    }
};

// Function to sign in the user 
export const signInUser = async ({email}: { email: string }) => {
    try {
        const existingUser = await getUserByEmail(email);

        // if user exist we sent otp to the email
        if (existingUser) {
            await sendEmailOTP({ email });
            return parseStringify({ accountId: existingUser.accountId });
        }
        // if user does not exist return user not found 
        return parseStringify({ accountId: null, error: "User not found" });
        
    } catch (error) {
        handleError(error, "Failed to sign in user");
    }
}