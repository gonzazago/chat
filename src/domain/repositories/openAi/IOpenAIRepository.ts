import {ChatCompletionMessageParam} from 'openai/resources';
import {BaseMessage} from "@langchain/core/messages";


export interface IOpenAIRepository {
    sendConversation(context: BaseMessage[]): Promise<string | undefined>

    buildCandidateFilterContext(): Promise<string>;

    buildCandidateClassificationContext(): Promise<string>;

    buildLangChainMessages(context: ChatCompletionMessageParam[], prompt:string): BaseMessage[];
}
