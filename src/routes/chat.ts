import { Message } from '@entities/message';
import  buildPrompt from '@services/chat';
import express, { Request, Response } from 'express';



const router = express.Router({
    strict: true
});

router.post('/chat', (req: Request, res: Response) => {
    console.log(req.body)
    const conversation:Message[] = req.body;
     buildPrompt(conversation).then(completation =>{
        res.status(200).json(completation)
    });
    ;
});
export default router;