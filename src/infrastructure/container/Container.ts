import { createCandidateRepository } from "@repositories/CandidateRepository";
import { openAiRepository } from "@repositories/openAi/OpenAIRepository";
import CandidateService from "@services/CandidateService";
import { OpenAIService } from "@services/OpenAIService";

class Container {

    private static instance: Container
    private dependencies: Map<String, any> = new Map();

    private constructor() {
        this.dependencies.set("ICandidateService", this.createCandidateService());
        this.dependencies.set("OpenAIService", this.createOpenAIServicce())
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    public resolve<T>(key: string): T {
        const dependency = this.dependencies.get(key);
        if (!dependency) {
            throw new Error(`Dependency ${key} not found`);
        }
        return dependency as T;
    }


    private createCandidateService() {
        return   new CandidateService(this.createCandidateRepository());
    }

    private createOpenAIServicce() {
        const openAIservice = new OpenAIService(this.createOpenAIRepository());
        return openAIservice;
    }

    private createCandidateRepository() {
        const candidateRepository = createCandidateRepository();
        return candidateRepository;
    }

    private createOpenAIRepository() {
        const repository = openAiRepository();
        return repository;
    }
}

export default Container;