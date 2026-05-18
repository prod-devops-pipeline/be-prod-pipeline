import Router from 'express';
import userRouter from './user';
import authRouter from './authRouter';
import productRouter from './productRouter';

const router = Router();

router.use('/user',userRouter);
router.use('/auth',authRouter);
router.use('/product',productRouter);

export default router;