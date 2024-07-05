import { BaseEntity } from "./BaseEntity";

export interface Candidate extends BaseEntity{
    name:string;
    email:string;
}