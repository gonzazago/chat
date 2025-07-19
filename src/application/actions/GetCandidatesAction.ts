import {ChatCompletionMessageParam} from 'openai/resources';
import {Candidate} from '@entities/Candidate';
import Container from '@infrastructure/container/Container';
import {IOpenAIService} from '@services/IOpenAIService';
import {IEmbeddingService} from '@services/IEmbeddingService';
import CandidateService from "@services/impl/CandidateService";
import {BaseMessage} from "@langchain/core/messages";
import {CandidateDTO, mapToCandidateDTO} from "../../delivery/dto/Candidate";

export class GetCandidatesAction {

    constructor(
        private candidateService: CandidateService,
        private openAIService: IOpenAIService,
        private embeddingService: IEmbeddingService
    ) {}

    public async getCandidates(context: ChatCompletionMessageParam[], jobOffer: string): Promise<CandidateDTO[] | null> {
        try {
            const embedding = await this.embeddingService.getEmbedding(jobOffer);
            const candidates: Candidate[] = await this.candidateService.searchByVector(embedding, 50);
            if (candidates.length === 0) return null;

            const selectedContext = await this.openAIService.buildCandidateFilterContext();
            const filterPrompt = this.buildFilterPrompt(selectedContext, jobOffer, candidates);
            console.log(filterPrompt);
            const selected = await this.openAIService.sendConversation(filterPrompt);

            const candidatesFromIA = this.mapResponseToJson(selected!!);

            // 4. Mapear respuesta final
            return mapToCandidateDTO(candidates, candidatesFromIA);
            return null
        } catch (error) {
            console.error('Error en getCandidates:', error);
            throw error;
        }
    }

    private buildFilterPrompt(selectedContext: string, jobOffer: string, candidates: Candidate[]): BaseMessage[] {
        console.log('Candidates:', candidates);
        const simplifyCandidates =  candidates.map((candidate) => {
            const currentPosition = candidate.experience?.find(e => e.actually)?.position;

            return {
                id: candidate.id, // Este es el ID del documento Mongo (u otro identificador)
                name: candidate.name,
                position: currentPosition,
                skills: candidate.skills?.map(skill => `${skill.name} (${skill.years} años)`)
            };
        });
        return this.openAIService.buildLangChainMessages([
            {
                role: 'system',
                content: `La búsqueda laboral es: ${jobOffer}`
            },
            {
                role: 'system',
                content: `Deberás evaluar los siguientes candidatos:\n${JSON.stringify(simplifyCandidates)}\n` +
                    `Respondé SOLO en formato JSON:\n` +
                    `{\n  "id": string,\n  "strengths": [string],\n  "weaknesses": [string],\n  "feedback": string\n}`
            }
        ], selectedContext);
    }

    private mapResponseToJson(response: string): any {
        return JSON.parse(response);
    }

}
