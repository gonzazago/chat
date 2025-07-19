
import { Candidate } from "@entities/Candidate";
import { ICandidateRepository } from './ICandidateRepository';
import CandidatesModel from "@infrastructure/persistence/mongo/CandidatesModel";
export const createCandidateRepository = (): ICandidateRepository => {

    return {
        getAll: async (filter: any) => {
            try {
                if (typeof filter === "string") {
                    const filterMongo =  JSON.parse(filter)
                    const candidates =await CandidatesModel.find(filterMongo).limit(20).exec();
                    return candidates
                } else {
                    const candidates =await CandidatesModel.find(filter).limit(20).exec();
                    return candidates
                }
            }catch (e){
                console.log(e)
                throw e
            }


        },
        getById: async (id: string) => {
            return null
        },
        save: async (candidate: Candidate) => {
            const candidateModel = new CandidatesModel(candidate)
            const candidateSave = await candidateModel.save()
            const { id, name, lastName, age, mail, phone, linkedinUrl, extract, skills, experience, englishLevel } = candidateSave
            const response: Candidate = {
                id, name, lastName, age, mail, phone, linkedinUrl, extract, skills, experience, englishLevel
            }
            return response

        },
        update: async (entity: Candidate, candidateId: string) => {
            const candidateUpdate = await CandidatesModel.findByIdAndUpdate(candidateId, entity);
            if (!candidateUpdate) {
                return Promise.reject(`Candidate not found for id[${candidateId}]`)
            }
            const { id, name, lastName, age, mail, phone, linkedinUrl, extract, skills, experience, englishLevel } = candidateUpdate
            const response: Candidate = { id, name, lastName, age, mail, phone, linkedinUrl, extract, skills, experience, englishLevel }
            return response
        },
        delete: async (id: string) => {
            console.log("delete")
        }

    }
}
