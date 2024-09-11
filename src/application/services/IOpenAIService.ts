import { ChatCompletionMessageParam } from 'openai/resources';
export interface IOpenAIService {
    sendConversation(message: ChatCompletionMessageParam[])
    buildCandidateFilterContext():Promise<string>;
    buildCandidateClassificationContext():Promise<string>;
}