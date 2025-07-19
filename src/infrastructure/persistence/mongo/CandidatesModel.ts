import mongoose, { Schema } from "mongoose";
import { Candidate, Skill, Experience } from '@entities/Candidate';

const experienceSchema = new Schema<Experience>({
    position: { type: String },
    startDate: { type: String },
    end: { type: String, default: "" },
    actually: { type: Boolean },
    company: { type: String },
    description: { type: String },
})

// 1. Define un schema para los objetos 'Skill' (Recomendado)
const skillSchema = new Schema<Skill>({
    name: { type: String },
    years: { type: Number }
}, { _id: false });

const CandidateSchema = new Schema<Candidate>({
    name: { type: String },
    lastName: { type: String },
    age: { type: Number },
    mail: { type: String },
    phone: { type: String },
    linkedinUrl: { type: String },
    extract: { type: String, },
    skills: [skillSchema],
    experience: [experienceSchema],
    englishLevel: { type: String },
})


export default mongoose.model<Candidate>('Candidates', CandidateSchema);



