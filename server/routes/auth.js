import express from 'express';
import { getUser, signIn, signUp, updateUsersBulk } from '../controller/auth.js';
    import { adminAuthGuard, userAuthGuard } from '../middleware/authGuard.js'; // Assuming you have an auth middleware for token verification

const router = express.Router();


// Sample route for authentication
router.post('/signup', signUp);
router.post('/signin', signIn);


router.get('/getUsers', adminAuthGuard, getUser);
router.post('/updateUsers', adminAuthGuard, updateUsersBulk);

export default router;