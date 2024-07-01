import mongoose from "mongoose";

const candidateCollection = "Candidates";

const candidateSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    age: Number,
    mail: String,
    phone: String,
    linkedinUrl: String,
    extract: String,
    skills: [
        {
            name: String,
            years: String
        }
    ],
    experience: [
        {
            position: String,
            init: String,
            end: String,
            actually: Boolean,
            company: String,
            description: String
        },
    ],
    englishLevel: String,

})

export const candidateModel = mongoose.model(candidateCollection, candidateSchema);