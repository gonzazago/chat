import { Message } from "./message";

export interface Chat{
    model:String,
    messages:Message[],
    temperature:Number,
    stream:Boolean,
}