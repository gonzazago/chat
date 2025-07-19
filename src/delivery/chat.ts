import {GetCandidatesAction} from '@actions/GetCandidatesAction';
import express, {Request, Response} from 'express';
import {ChatCompletionMessageParam} from "openai/resources";
import {GetCandidatesByQueryAction} from '@actions/GetCandidatesByQueryAction';
import Container from "@infrastructure/container/Container";


const router = express.Router({
    strict: true
});
const getCandidatesFromIA = Container.getInstance().resolve<GetCandidatesAction>('GetCandidatesAction');
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

export default router;
