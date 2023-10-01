import express from 'express'
import authRouter from './auth.js';
import noteRouter from './notes.js';

const mainRouter = express.Router();
mainRouter.use('/auth',authRouter);
mainRouter.use('/note',noteRouter);

export default mainRouter;