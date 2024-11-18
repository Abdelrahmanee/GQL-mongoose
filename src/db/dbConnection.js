import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { Movie } from "./models/movie.model.js";
import { Comment } from "./models/comment.model.js";
import { User } from "./models/user.model.js";
dotenv.config()

export async function setUpDatabase() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to the database successfully!");

        // return { 
        //     User, 
        //     Movie, 
        //     Comment 
        // }; // Return models for use in other parts of the app
    } catch (err) {
        console.error("Failed to connect to the database:", err.message);
        process.exit(1); // Exit the app if the connection fails
    }
}