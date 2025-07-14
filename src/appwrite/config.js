import conf from "../conf/conf.js";
import {Client ,ID , Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
   
    constructor(){
        console.log("Initializing Appwrite client with config:", {
            url: conf.appwriteUrl,
            projectId: conf.appwriteProjectID,
            databaseId: conf.appwriteDatabaseID,
            collectionId: conf.appwriteCollectionID,
            bucketId: conf.appwriteBucketID
        });
        
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug ,content ,featuredImage, status, userId}){
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        );
    }
    
    async updatePost(slug , {title,content ,featuredImage, status, userId}){
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        ) 
    }

    async deletePost(slug){
        await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
        return true
    }

    async getPost(slug){
        return await this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries,
        )
    }

    //file upload service
    async uploadFile(file){
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
        )
    }

    async deleteFile(fileId){
        await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileId
        ) 
    }

    getFilePreview(fileId){
        console.log("Appwrite config:", {
            url: conf.appwriteUrl,
            projectId: conf.appwriteProjectID,
            bucketId: conf.appwriteBucketID
        });
        console.log("Getting file preview for ID:", fileId);
        
        try {
            const url = this.bucket.getFilePreview(
                conf.appwriteBucketID,
                fileId
            );
            console.log("Generated file URL:", url);
            return url;
        } catch (error) {
            console.error("Error generating file preview URL:", error);
            throw error;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketID,
            fileId
        );
    }
}

const service = new Service();
export default service;