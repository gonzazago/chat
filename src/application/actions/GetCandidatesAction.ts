import { openAiRepository } from "@repositories/openAi/OpenAIRepository";
import { OpenAIService } from "@services/OpenAIService";
import { ChatCompletionMessageParam } from "openai/resources";
import { candidateService } from '../services/CandidateService';
import { createCandidateRepository } from "@repositories/CandidateRepository";



const repository = openAiRepository();
const openAIservice = new OpenAIService(repository);
const candidateRepository = createCandidateRepository();
const service = candidateService(candidateRepository)


export const getCandidates = async (context: ChatCompletionMessageParam[], jobOffer: string) => {
    const filterContext = await openAIservice.buildCandidateClassificationContext();
    const messages: ChatCompletionMessageParam[] = [];
    const message: ChatCompletionMessageParam = {
        role: "system",
        content: filterContext,
    }

    messages.push(message)
    messages.push(...context)
    const completationResponse = await openAIservice.sendConversation(messages);

    const candidates = await service.getAll(completationResponse);

    
    

    const selectedContext = await openAIservice.buildCandidateFilterContext();

    const filterMessages: ChatCompletionMessageParam[] = [];

    filterMessages.push({
        role: "system",
        content: selectedContext,
    })

    filterMessages.push({
        role: "assistant",
        content: `la busqueda laboral es la siguiente ${jobOffer}`
    })
    filterMessages.push({
        role: "assistant",
        content: ` Deberas tomar en cuenta los empleados de la siguiente lista${candidates}, RECUERDA DEBOLVER UN JSON`
    })

    const selected = await openAIservice.sendConversation(filterMessages);
    console.log("selected",selected);

    return selected;



}
