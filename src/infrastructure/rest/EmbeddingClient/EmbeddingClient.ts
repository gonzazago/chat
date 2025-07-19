import {RestClient} from "@infrastructure/rest/RestClient";


export class EmbeddingClient {
    private client: RestClient;

    constructor() {
        const baseURL = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8000';
        this.client = new RestClient(baseURL);
    }

    async getEmbedding(text: string): Promise<number[]> {
        const response = await this.client.post<{ embedding: number[] }>('/embed', { text });
        return response.embedding;
    }
}
