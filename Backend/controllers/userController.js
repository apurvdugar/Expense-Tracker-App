import express from 'express';
import isAuth from '../middleware/isAuth.js';
import User from '../models/user.model.js';

const userRouter = express.Router();

userRouter.get('/current', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default userRouter;
