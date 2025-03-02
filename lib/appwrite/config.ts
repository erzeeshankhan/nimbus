// this file contains the config for the appwrite sdk and the appwrite server url so that we dont have to recall the appwrite variable by their name and we can just import the config file and use the variables

export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!, 
    usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    filesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
    bucketId : process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey : process.env.NEXT_APPWRITE_KEY!,
    
};