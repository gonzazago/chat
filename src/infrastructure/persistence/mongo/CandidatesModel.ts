import mongoose, { Schema } from "mongoose";
import { Candidate, Skill, Experience } from '@entities/Candidate';

const CandidateSchema = new Schema<Candidate>({
    name: { type: String },
    lastName: { type: String },
    age: { type: Number },
    mail: { type: String },
    phone: { type: String },
    linkedinUrl: { type: String },
    extract: { type: String, },
    skills: { typeof: Array<Skill>, },
    experience: { typeof: Array<Experience>, default: [] },
    englishLevel: { type: String },
})


export default mongoose.model<Candidate>('Candidates', CandidateSchema);



