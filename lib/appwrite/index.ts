// this file contains our backend server setup and the Node appwrite sdk setup

import { Account, Client, Databases } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

// Create an appwrite session client first, this will be of users to manage their data 
export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId);

        const session = (await cookies()).get('appwrite.session');

        if(!session || !session.value) throw new Error('No session found');

        return {
            get account() {
                return new Account(client);
            }
            get databases() {
                return new Databases(client);
            }
        }

}

// Create an appwrite admin client to manage the appwrite server( this should never be exposed to the client side/users)
// Making seperate clients for the users and the admin will help us to manage the data and the server more efficiently and avoid any security issues for users and server 
export const createAdminClient = async () => {

}