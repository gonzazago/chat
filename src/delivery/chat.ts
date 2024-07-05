import buildPrompt from '@services/chat';
import express, { Request, Response } from 'express';
import { ChatCompletionMessageParam } from "openai/resources";



const router = express.Router({
    strict: true
});

router.post('/chat', (req: Request, res: Response) => {
    console.log(req.body)
    const conversation: ChatCompletionMessageParam[] = req.body;
    buildPrompt(conversation).then(completation => {
        res.status(200).json(completation)
    })
        .catch(e => {
            console.log(e);
            res.status(500).json({
                "status": 500,
                "message":"internal server error"
            })
        });
    ;
});
export default router;