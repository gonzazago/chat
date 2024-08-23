
import { ChatCompletionMessageParam } from "openai/resources";
import { readFileSync } from 'fs'
import CandidatesModel from '@infrastructure/persistence/mongo/CandidatesModel';
import { sendConversation } from "@repositories/openAi";
const buildPrompt = async (conversation: ChatCompletionMessageParam[]) => {
    const messages: ChatCompletionMessageParam[] = [];

    const context = buildTranslateContext();
    const message: ChatCompletionMessageParam = {
        role: "system",
        content: context,
    }

    messages.push(message)
    messages.push(...conversation)

    const completationResponse = await sendConversation(messages);
    const rest = await CandidatesModel
    .find(JSON.parse(completationResponse!!))
    .limit(10)
    .exec();
    return rest
}


const buildTranslateContext = () => {
    const context = readFileSync(`${__dirname}/config/prompt.txt`, "utf-8")
    return context
}


export default buildPrompt;