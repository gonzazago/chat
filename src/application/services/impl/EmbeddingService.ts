import {IEmbeddingService} from "@services/IEmbeddingService";
import {EmbeddingClient} from "@infrastructure/rest/EmbeddingClient/EmbeddingClient";


export class EmbeddingService implements IEmbeddingService {
    private embeddingClient: EmbeddingClient;

    constructor(embeddingClient: EmbeddingClient) {
        this.embeddingClient = embeddingClient;
    }

    async getEmbedding(text: string): Promise<number[]> {
        return this.embeddingClient.getEmbedding(text);
    }
}
