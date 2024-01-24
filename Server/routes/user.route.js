import express from 'express';
const router = express.Router();
import { checkTokenAdmin, checkToken } from "../util/middleware.js";
import { create } from "../controllers/user.controller.js";


/**
 * @route   POST /users
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup', create);

export default router;
