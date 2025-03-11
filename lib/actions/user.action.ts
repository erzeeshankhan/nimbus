"use server";


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
}
// Creating a new server action 
const createAccount = async ({ fullName, email }: { fullName: string, email: string }) => {

    const existingUser = await getUserByEmail(email);


}