import { sendConversation } from '@repositories/openAi';
import { ChatCompletionMessageParam } from "openai/resources";
import { readFileSync } from 'fs'
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
    console.log(completationResponse);

    return completationResponse
}


const buildContext = () => {
    const context = readFileSync('./src/config/prompt.txt', "utf-8")
    return context
}


export default buildPrompt;