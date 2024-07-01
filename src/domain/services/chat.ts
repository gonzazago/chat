import { Chat } from '@entities/chat';
import { Message } from '@entities/message'
import { sendConversation } from '@repositories/openAi';
import {readFileSync} from 'fs'
const buildPrompt = async (conversation:Message[])=>{
    const messages:Message[] = [];
    
    const context = buildContext();
    const message:Message = {
        role: "system",
        content:context,
    }

    messages.push(message)
    messages.push(...conversation)

    const completationResponse = await sendConversation(messages);

    const chat = JSON.parse(completationResponse);

    return chat
}


const buildContext = () =>{
    const context = readFileSync('./src/config/prompt.txt',"utf-8")
    return context
}


export default buildPrompt;