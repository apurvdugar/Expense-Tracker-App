import express from 'express';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();
userRouter.get('/current', isAuth,(req,res)=>{
    res.json({ message: "You are authenticated" });
});

export default userRouter;