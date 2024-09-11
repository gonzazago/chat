import { openAiRepository } from "@repositories/openAi/OpenAIRepository";
import { ChatCompletionMessageParam } from "openai/resources";
import { Candidate, Experience } from "@entities/Candidate"
import { OpenAIService } from "@services/OpenAIService";
import CandidateService from '@services/CandidateService';
import OpenAI from 'openai';
import Container from "@infrastructure/container/Container";


export class GetCandidatesByQueryAction {
    private openAIservice: OpenAIService;
    private service: CandidateService;

    constructor() {
        this.service = Container.getInstance().resolve<CandidateService>("ICandidateService");
        this.openAIservice = Container.getInstance().resolve<OpenAIService>("OpenAIService");;
    }

    public async getCandidates(skill?: string, englishLevel?: string) {
        const query: any = {};

        if (skill && skill.length > 0) {
            query["skills.name"] = { $in: skill.split(",") };
        }

        // // Filtro por país (array)
        // if (country && country.length > 0) {
        //     query.country = { $in: country }; 
        // }

        // Filtro por nivel de inglés (array)
        if (englishLevel && englishLevel.length > 0) {
            query.englishLevel = { $in: englishLevel.split(",") };  // Busca candidatos que tengan cualquier nivel de inglés en el array
        }
        const response = await this.service.getAll(query)
        return response;
    }


}