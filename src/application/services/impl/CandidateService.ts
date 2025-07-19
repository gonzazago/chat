import {Candidate} from '@entities/Candidate';
import {BaseService} from './BaseService';
import Container from "@infrastructure/container/Container";
import {ICandidateRepository} from "@repositories/ICandidateRepository";
import {ElasticsearchClient} from "@infrastructure/persistence/elasticsearch/ElasticsearchClient";
import {ICandidateService} from "@services/ICandidateService";


class CandidateService extends BaseService<Candidate> implements ICandidateService {
    private elasticClient: ElasticsearchClient;

    constructor(
        repository: ICandidateRepository,
        elasticClient: ElasticsearchClient
    ) {
        super(repository);
        this.elasticClient = elasticClient;
    }

    async searchByVector(vector: number[], k: number): Promise<Candidate[]> {
        return this.elasticClient.knnSearch(vector, k);
    }
}

export default CandidateService;
