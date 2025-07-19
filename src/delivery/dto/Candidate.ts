// En delivery/dto/CandidateRanked.ts
import {Candidate} from "@entities/Candidate";

export interface CandidateDTO {
    id: string;
    name: string;
    position?: string;
    linkedin: string;
    strengths: string[];
    weaknesses: string[];
    feedback: string;
    rankScore?: number;
}

export function mapToCandidateDTO(candidates: Candidate[], candidateSelects: any[]): CandidateDTO[] {
    return candidates.map(candidate => {
        const sel = candidateSelects.find((c: any) => c.id === candidate.id);
        const currentExp = candidate.experience.find((exp: any) => exp.actually === true);

        return {
            id: candidate.id,
            name: candidate.name,
            position: currentExp?.position,
            linkedin: candidate.linkedinUrl,
            strengths: sel?.strengths || [],
            weaknesses: sel?.weaknesses || [],
            feedback: sel?.feedback || '',
            rankScore: sel?.rankScore
        };
    });
}
