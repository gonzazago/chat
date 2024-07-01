
import { Chat } from "@entities/chat";
import { Message } from '@entities/message';
import { Configuration, OpenAIApi } from "openai";

import axios from "axios"

const configuration = new Configuration({
  apiKey: "sk-CvH53gmOMCAfWtefxw98T3BlbkFJCJ3VcAb7gDHgGdMe1i"
});
const openai = new OpenAIApi(configuration);


export const sendConversation = async (messages: Message[]) => {

  try {


    const chatCompletion = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: messages,
      max_tokens: 150,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

  

    const consultaMongoDB = chatCompletion.data.choices[0].text.trim();
    console.log(consultaMongoDB)
    return consultaMongoDB.choices[0]["message"]["content"];
  } catch (e) {
    console.log(e)
  }



}

