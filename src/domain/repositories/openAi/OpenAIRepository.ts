import {ChatOpenAI} from "@langchain/openai";
import {AIMessage, BaseMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";
import {readFileSync} from 'fs';
import {ChatCompletionMessageParam} from "openai/resources";


const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
});


export const openAiRepository = (): {
    sendConversation: (context: BaseMessage[]) => Promise<string | undefined>;
    buildCandidateClassificationContext: () => Promise<string>;
    buildCandidateFilterContext: () => Promise<string>;
    buildLangChainMessages: (context: ChatCompletionMessageParam[], prompt: string) => BaseMessage[]
} => {
    return {
        sendConversation: async (context: BaseMessage[]): Promise<string | undefined> => {
            try {

                const response = await llm.invoke(context);

                const queryMongoDB = response.content.toString().trim();
                return queryMongoDB ? queryMongoDB.replace(/```json|```/g, "") : "";
            } catch (e) {
                console.log(e)
            }
        },
        buildCandidateClassificationContext: async (): Promise<string> => {
            return readFileSync(`${__dirname}/config/prompt.txt`, "utf-8")

        },
        buildCandidateFilterContext: async (): Promise<string> => {
            return readFileSync(`${__dirname}/config/filter_candidates.txt`, "utf-8")
        },
        buildLangChainMessages: (context: ChatCompletionMessageParam[],
                                 prompt: string): BaseMessage[] => {

            const convertedContext = context.map((message) => {
                switch (message.role) {
                    case "user":
                        return new HumanMessage({content: message.content || ""});
                    case "assistant":
                        return new AIMessage({content: message.content || ""});
                    default:
                        return new SystemMessage({content: message.content || ""});
                }
            });

            return [
                new SystemMessage({content: prompt}),
                ...convertedContext,
            ];

        }


    }
}
