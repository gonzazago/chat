import {IBaseService} from "@services/IBaseService";
import {Candidate} from "@entities/Candidate";

export interface ICandidateService extends IBaseService<Candidate> {
    searchByVector(vector: number[], k: number): Promise<Candidate[]>;
}
