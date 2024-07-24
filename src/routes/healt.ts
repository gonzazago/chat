import express, { Request, Response } from 'express';

const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response) => {
    res.send("Hola Mundo")
});
export default router;