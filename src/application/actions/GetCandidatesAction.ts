import { ChatCompletionMessageParam } from "openai/resources";
import { Candidate, Experience } from "@entities/Candidate"
import { OpenAIService } from "@services/OpenAIService";
import CandidateService from '@services/CandidateService';
import Container from "@infrastructure/container/Container";


export class GetCandidatesAction {
    private openAIservice: OpenAIService;
    private service: CandidateService;

    constructor() {
        this.service = Container.getInstance().resolve<CandidateService>("ICandidateService");
        this.openAIservice = Container.getInstance().resolve<OpenAIService>("OpenAIService");;
    }

    public async getCandidates(context: ChatCompletionMessageParam[], jobOffer: string) {
        const queryContext = await this.openAIservice.buildCandidateClassificationContext();
        const messages = this.buildQueryPrompt(context, queryContext)
        const completationResponse = this.openAIservice.sendConversation(messages);
        const candidates = await this.service.getAll(completationResponse);

        const selectedContext = await this.openAIservice.buildCandidateFilterContext();
        const filterPrompt = this.buildFilterPrompt(selectedContext, jobOffer, candidates)

        const selected = await this.openAIservice.sendConversation(filterPrompt);
        const candidatesFromIA = this.mapResponseToJson(selected);

        const idsQuery = JSON.stringify({ _id: { $in: candidatesFromIA.map(sel => sel.id) } });

        const candidatesResponse = await this.service.getAll(idsQuery)

        const response = mapToCandidateResponse(candidatesResponse, candidatesFromIA)

        return response;
    }

    private buildQueryPrompt(context: ChatCompletionMessageParam[], prompt: string) {
        const messages: ChatCompletionMessageParam[] = [];
        const message: ChatCompletionMessageParam = {
            role: "system",
            content: prompt,
        }

        messages.push(message)
        messages.push(...context)
        return messages
    }
    private buildFilterPrompt(selectedContext: string, jobOffer: string, candidates: Candidate[]) {
        const filterPrompt: ChatCompletionMessageParam[] = [];

        filterPrompt.push({
            role: "system",
            content: selectedContext,
        })

        filterPrompt.push({
            role: "assistant",
            content: `la busqueda laboral es la siguiente ${jobOffer}`
        })
        filterPrompt.push({
            role: "assistant",
            content: ` Deberas tomar en cuenta los empleados de la siguiente lista${candidates}, 
        Deberas respondar la respuesta en formato JSON solamente
        utiliza la siguiente estructura por cada candidato:
            {
                "id":string,
                "strengths:":[string]
                "weaknesses":[string]
                "feedbak":string
            }
        donde en los campos strengths y weaknesses, deberas armar una lista de hasta 5 atributos como maximo y
        un feedback que no supere las 20 palabras`
        })

        return filterPrompt;
    }
    private mapResponseToJson(reponse: string) { return JSON.parse(reponse); }

    private mapToCandidateResponse(candidates: Candidate[], candidateSelects) {

        const response = candidates.map((candidate, index) => {
            const sel = candidateSelects.find(c => c.id == candidate.id)
            const exp: Experience[] = candidate.experience;
            let position;
            position = exp.find(c => c.actually)?.position

            return {
                id: candidate.id,
                name: candidate.name,
                position: position,
                linkedin: candidate.linkedinUrl,
                strengths: sel.strengths.join(" "),
                weaknesses: sel.weaknesses.join(" "),
                feedback: sel.feedback
            };
        });

        return response;


    }
}


// const buildQueryPrompt = (context: ChatCompletionMessageParam[], prompt: string) => {

//     const messages: ChatCompletionMessageParam[] = [];
//     const message: ChatCompletionMessageParam = {
//         role: "system",
//         content: prompt,
//     }

//     messages.push(message)
//     messages.push(...context)
//     return messages
// }

// const buildFilterPrompt = (selectedContext: string, jobOffer: string, candidates: Candidate[]) => {

//     const filterPrompt: ChatCompletionMessageParam[] = [];

//     filterPrompt.push({
//         role: "system",
//         content: selectedContext,
//     })

//     filterPrompt.push({
//         role: "assistant",
//         content: `la busqueda laboral es la siguiente ${jobOffer}`
//     })
//     filterPrompt.push({
//         role: "assistant",
//         content: ` Deberas tomar en cuenta los empleados de la siguiente lista${candidates}, 
//         Deberas respondar la respuesta en formato JSON solamente
//         utiliza la siguiente estructura por cada candidato:
//             {
//                 "id":string,
//                 "strengths:":[string]
//                 "weaknesses":[string]
//                 "feedbak":string
//             }
//         donde en los campos strengths y weaknesses, deberas armar una lista de hasta 5 atributos como maximo y
//         un feedback que no supere las 20 palabras`
//     })

//     return filterPrompt;
// }

// const mapResponseToJson = (reponse: string) => JSON.parse(reponse);

const mapToCandidateResponse = (candidates: Candidate[], candidateSelects) => {

    const response = candidates.map((candidate, index) => {
        const sel = candidateSelects.find(c => c.id == candidate.id)
        const exp: Experience[] = candidate.experience;
        let position;
        position = exp.find(c => c.actually)?.position

        return {
            id: candidate.id,
            name: candidate.name,
            position: position,
            linkedin: candidate.linkedinUrl,
            strengths: sel.strengths.join(" "),
            weaknesses: sel.weaknesses.join(" "),
            feedback: sel.feedback
        };
    });

    return response;


}