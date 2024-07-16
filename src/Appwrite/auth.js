import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthServiece{
    client = new Client();
    accounts;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.accounts= new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = this.accounts.create(ID.unique(),email,password,name);

            if(userAccount){
                return this.loginAccount(email,password);
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite auth :: createAccount :: error",error);
        }
    }

    async loginAccount({email,password}){
        try {
            return await this.accounts.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("Appwrite auth :: loginAccount :: error",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.accounts.get();
        } catch (error) {
            console.log("Appwrite auth :: fetCurrentUser :: error",error);
        }
        return null;
    }

    async logOut(){
        try {
            return await this.accounts.deleteSessions();
        } catch (error) {
            console.log("Appwrite auth :: logout :: error",error);
        }
    }
}

const authServiece = new AuthServiece
export default authServiece