

import { GetCandidatesAction } from '@actions/GetCandidatesAction';
import express, { Request, Response } from 'express';
import { ChatCompletionMessageParam } from "openai/resources";
import { GetCandidatesByQueryAction } from '@actions/GetCandidatesByQueryAction';



const router = express.Router({
    strict: true
});
const getCandidatesFromIA = new GetCandidatesAction();
const getCandidatesByQuery = new GetCandidatesByQueryAction();

router.post('/chat', (req: Request, res: Response) => {
    const offer = req.body[0].content;
    const conversation: ChatCompletionMessageParam[] = req.body;

    getCandidatesFromIA.getCandidates(conversation, offer).then(completation => {
        res.status(200).json(completation)
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            "status": 500,
            "message": "internal server error"
        })
    })
});

router.get('/chat', (req: Request, res: Response) => {
    
    

    const { skill, englishLevel } = req.query as { skill?: string, englishLevel?: string };
    console.log(skill,englishLevel);

    getCandidatesByQuery.getCandidates(skill, englishLevel).then(candidates => {
        res.status(200).json(candidates)
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            "status": 500,
            "message": "internal server error"
        })
    })
});
export default router;