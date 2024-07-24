

import OpenAI from "openai";

import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: "sk-proj-h712IDjgPyvTQkx1KXsCT3BlbkFJjDmfzlgexXhGalfnXge6",
});

export const sendConversation = async (messages: ChatCompletionMessageParam[]) => {

  try {


    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 500,
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



}

