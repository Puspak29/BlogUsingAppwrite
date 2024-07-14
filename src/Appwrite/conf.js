import {Client, Databases, Storage, ID, Query } from "appwrite"
import config from "../config/config" 

export class Service{
    client = new Client();
    databases;
    storages;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases= new Databases(this.client);
        this.storages= new Storage(this.client);
    }

    async createPost({title, slug, content, userId, featuredImage, status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
        }
    }

    async getPosts(queries= [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
        }
    }

    async uploadFile(file){
        try {
            return await this.storages.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storages.deleteFile(
                config.appwriteBucketId,
                fileId,
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    filePreview(fileId){
        return this.storages.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}