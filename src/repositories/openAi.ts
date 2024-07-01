
import { Chat } from "@entities/chat";
import { Message } from '@entities/message';
import OpenAI from "openai";
import axios from "axios"

export const sendConversation = async (chat:Chat) =>{
  try{
    const {data} =await axios.post(" https://api.openai.com/v1/chat/completions", chat,{headers:{
      Authorization: `Bearer `,
      "Content-Type":"application/json"
    }})
    return data.choices[0]["message"]["content"];
  }catch(e){
    console.log(e)
  }



}

