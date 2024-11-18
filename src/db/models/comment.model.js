import mongoose from "mongoose";




const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    email: { type: String, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);
