
import { BaseRepository } from './BaseRepository';
import { Candidate } from "@entities/Candidate";
import { ICandidateRepository } from './ICandidateRepository';
export const createCandidateRepository = (): ICandidateRepository => {

    return {
        getAll: async () => {
            return []
        },
        getById: async (id: string) => {
            return null
        },
        save: async (candidate: Candidate) => {
            return Promise.resolve({ id: "id", name: "name", email: "email" })
        },
        update: async (entity: Candidate, id: string) => {
            return Promise.resolve({ id: "id", name: "name", email: "email" })
        },
        delete: async (id: string) => {
            console.log("delete")
        }

    }
}