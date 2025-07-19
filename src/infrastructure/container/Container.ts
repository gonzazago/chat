import {createCandidateRepository} from "@repositories/CandidateRepository";
import {openAiRepository} from "@repositories/openAi/OpenAIRepository";
import CandidateService from "@services/impl/CandidateService";
import {OpenAIService} from "@services/impl/OpenAIService";
import {EmbeddingClient} from "@infrastructure/rest/EmbeddingClient/EmbeddingClient";
import {ElasticsearchClient} from "@infrastructure/persistence/elasticsearch/ElasticsearchClient";
import {GetCandidatesAction} from "@actions/GetCandidatesAction";
import {IOpenAIService} from "@services/IOpenAIService";
import {IEmbeddingService} from "@services/IEmbeddingService";
import {EmbeddingService} from "@services/impl/EmbeddingService";

class Container {

    private static instance: Container
    private dependencies: Map<String, any> = new Map();

    private constructor() {
        this.dependencies.set("ElasticsearchClient", this.createElasticsearchClient());
        this.dependencies.set("EmbeddingClient", this.createEmbeddingClient());
        this.dependencies.set("CandidateRepository", this.createCandidateRepository());

        this.dependencies.set("ICandidateService", this.createCandidateService());
        this.dependencies.set("OpenAIService", this.createOpenAIService());
        this.dependencies.set("IEmbeddingService", this.createEmbeddingService())

        this.dependencies.set('GetCandidatesAction', this.createGetCandidatesAction());
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

    private createCandidateRepository() {
        return createCandidateRepository();
    }

    private createOpenAIRepository() {
        return openAiRepository();
    }

    private createEmbeddingClient() {
        return new EmbeddingClient();
    }
    private createElasticsearchClient(): ElasticsearchClient {
        return new ElasticsearchClient();
    }


    private createCandidateService() {
        const repository = this.createCandidateRepository();
        const elasticClient = this.resolve<ElasticsearchClient>('ElasticsearchClient');

        return new CandidateService(repository, elasticClient);
    }

    private createOpenAIService() {
        return new OpenAIService(this.createOpenAIRepository());
    }

    private createEmbeddingService() {
        return new EmbeddingService(this.createEmbeddingClient());
    }

    private createGetCandidatesAction() {
        return new GetCandidatesAction(
            this.resolve<CandidateService>("ICandidateService"),
            this.resolve<IOpenAIService>("OpenAIService"),
            this.resolve<IEmbeddingService>("IEmbeddingService")
        );
    }
}

export default Container;
