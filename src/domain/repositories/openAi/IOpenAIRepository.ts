import { ChatCompletionMessageParam } from 'openai/resources';


export interface IOpenAIRepository {
    sendConversation(context: ChatCompletionMessageParam[])
    buildCandidateFilterContext(): Promise<string>;
    buildCandidateClassificationContext(): Promise<string>;
}