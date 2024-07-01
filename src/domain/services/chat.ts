
import { ChatCompletionMessageParam } from "openai/resources";
import { readFileSync } from 'fs'
import { sendConversation } from "@repositories/openAi";
import { candidateModel } from "@repositories/mongo/models/Candidate";

const buildPrompt = async (conversation: ChatCompletionMessageParam[]) => {
    const messages: ChatCompletionMessageParam[] = [];

    const context = buildContext();
    const message: ChatCompletionMessageParam = {
        role: "system",
        content: context,
    }

    messages.push(message)
    messages.push(...conversation)

    // const query = await sendConversation(messages);
    // console.log("query",query);


    const query = `{
    "$or": [
        {
            "skills": {
                "$in": [
                    { "name": "Python", "years": { "$gte": 5 } },
                    { "name": "Kafka", "years": { "$gte": 5 } },
                    { "name": "Rabbit", "years": { "$gte": 5 } },
                    { "name": "AWS" }
                ]
            }
        },
        { "experience.position": { "$regex": "Sr", "$options": "i" } },
        { "englishLevel": "C1" },
        { "country": "AR" },
        { "country": "UY" },
        { "country": "CO" },
        { "country": "PE" },
        { "country": "BR" }
    ]
}
`

    const candidates = candidateModel.find(JSON.parse(query!!))



    return candidates
}


const buildContext = () => {
    const context = readFileSync('./src/config/prompt.txt', "utf-8")
    return context
}


export default buildPrompt;