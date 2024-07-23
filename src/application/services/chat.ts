import { sendConversation } from '@repositories/open-ai/openAi';
import { ChatCompletionMessageParam } from "openai/resources";
import { readFileSync } from 'fs'
import CandidatesModel from '@infrastructure/persistence/mongo/CandidatesModel';
const buildPrompt = async (conversation: ChatCompletionMessageParam[]) => {
    const messages: ChatCompletionMessageParam[] = [];

    const context = buildContext();
    const message: ChatCompletionMessageParam = {
        role: "system",
        content: context,
    }

    messages.push(message)
    messages.push(...conversation)

    const completationResponse = await sendConversation(messages);
    console.log(JSON.parse(completationResponse!!));
    const rest = await CandidatesModel
    .find(JSON.parse(completationResponse!!))
    .limit(10)
    .exec();
    return rest
}


const buildContext = () => {
    const context = readFileSync('./src/config/prompt.txt', "utf-8")
    return context
}


export default buildPrompt;