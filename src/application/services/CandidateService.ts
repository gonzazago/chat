import { Candidate } from "@entities/Candidate";
import { ICandidateRepository } from "@repositories/ICandidateRepository";
import { BaseService } from "./BaseService";

export const candidateService = (repository: ICandidateRepository) => {

    return BaseService<Candidate>(repository);
}