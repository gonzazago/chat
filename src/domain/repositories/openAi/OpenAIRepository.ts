
import OpenAI from 'openai';
import { IOpenAIRepository } from './IOpenAIRepository';
import { ChatCompletionMessageParam } from 'openai/resources';
import { readFileSync } from 'fs';


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });


export const openAiRepository = () : IOpenAIRepository =>{
    return{
        sendConversation: async (context: ChatCompletionMessageParam[]) => {
            try {


                const chatCompletion = await openai.chat.completions.create({
                  model: "gpt-4o",
                  messages: context,
                  max_tokens: 1000,
                  temperature: 0.5,
                  top_p: 1,
                  frequency_penalty: 0,
                  presence_penalty: 0
                });
            
                const consultaMongoDB = chatCompletion.choices[0].message.content?.trim();
                var query = consultaMongoDB?.replace("```json","").replace("```","")
                return query;
              } catch (e) {
                console.log(e)
              }
        },
        buildCandidateClassificationContext: async ():Promise<string> => {
            const context = readFileSync(`${__dirname}/config/prompt.txt`, "utf-8")
            return context
            
        },
        buildCandidateFilterContext: async (): Promise<string> => {
            const context = readFileSync(`${__dirname}/config/filter_candidates.txt`, "utf-8")
            return context
        }
    }
}