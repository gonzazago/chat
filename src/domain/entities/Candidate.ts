import { BaseEntity } from "./BaseEntity";

export interface Candidate extends BaseEntity{
    name:         string;
    lastName:     string;
    age:          number;
    mail:         string;
    phone:        string;
    linkedinUrl:  string;
    extract:      string;
    skills:       Skill[];
    experience:   Experience[];
    englishLevel: string;
}
export interface Experience {
    position:    string;
    init:        string;
    end:         null | string;
    actually:    boolean;
    company:     string;
    description: string;
}

export interface Skill {
    name:  string;
    years: number;
}