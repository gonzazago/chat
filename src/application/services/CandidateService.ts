import { Candidate } from "@entities/Candidate";
import { ICandidateRepository } from "@repositories/ICandidateRepository";
import { BaseService } from "./BaseService";

// export const candidateService = (repository: ICandidateRepository) => {

//     return BaseService<Candidate>(repository);
// }


class CandidateService extends BaseService<Candidate> implements CandidateService{

    constructor(repository:ICandidateRepository){
        super(repository);
    }

}

export default CandidateService