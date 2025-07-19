import { Client } from '@elastic/elasticsearch';

export class ElasticsearchClient {
    private client: Client;
    private indexName = 'candidates';

    constructor() {
        this.client = new Client({
            node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
        });
    }

    public async knnSearch(vector: number[], k: number) {
        const response = await this.client.transport.request({
            method: 'POST',
            path: `/${this.indexName}/_search`,
            body: {
                knn: {
                    field: 'vector',
                    query_vector: vector,
                    k,
                    num_candidates: Math.min(k * 5, 100)
                },
                _source: {
                    exclude: ['vector'],
                }
            }
        }) as any;

        return response.hits.hits.map((hit: any) => hit._source);
    }

    public async indexCandidate(candidateId: string, candidate: any, embedding: number[]) {
        await this.client.index({
            index: this.indexName,
            id: candidateId,
            document: {
                ...candidate,
                embedding
            }
        });
    }
}
