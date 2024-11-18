import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genres: [String],
}, { timestamps: true });


export const Movie = mongoose.model("Movie", movieSchema);
