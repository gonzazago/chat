import { ChatCompletionMessageParam } from 'openai/resources';
import { IOpenAIService } from './IOpenAIService';
import { IOpenAIRepository } from '@repositories/openAi/IOpenAIRepository';

export class OpenAIService implements IOpenAIService {

    constructor(private openai: IOpenAIRepository) { }
    buildCandidateFilterContext(): Promise<string> {
      return  this.openai.buildCandidateFilterContext()
    }
    buildCandidateClassificationContext(): Promise<string> {
        return this.openai.buildCandidateClassificationContext();
    }
    sendConversation(message: ChatCompletionMessageParam[]) {
       return this.openai.sendConversation(message);
    }

}