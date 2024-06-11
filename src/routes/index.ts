import {Router}  from 'express';
import chatRouter from './chat'

const router = Router();

router.use("/v1",chatRouter)

export default router

