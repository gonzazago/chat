import {ChatCompletionMessageParam} from 'openai/resources';
import {IOpenAIService} from '../IOpenAIService';
import {IOpenAIRepository} from '@repositories/openAi/IOpenAIRepository';
import {BaseMessage} from "@langchain/core/messages";

export class OpenAIService implements IOpenAIService {

    constructor(private openai: IOpenAIRepository) {
    }

    buildCandidateFilterContext(): Promise<string> {
        return this.openai.buildCandidateFilterContext()
    }

    buildCandidateClassificationContext(): Promise<string> {
        return this.openai.buildCandidateClassificationContext();
    }

    sendConversation(message: BaseMessage[]): Promise<string | undefined> {
        return this.openai.sendConversation(message);
    }

    buildLangChainMessages(context: ChatCompletionMessageParam[], prompt: string): BaseMessage[]{
        return this.openai.buildLangChainMessages(context, prompt);
    }

}
