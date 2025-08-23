import express from 'express';
const router = express.Router();
import { getAllUsers, login, logout, searchUsers, signUp } from '../controller/user.controller.js';
import { authToken } from '../middleware/authToken.js';
import { getMessage, sendMessage } from '../controller/message.controller.js';

//User Routes
router.post("/signup", signUp);
router.post("/login", login);
router.get("/get-allUsers", authToken, getAllUsers);
router.get("/user-logout", logout);
router.post("/search-users", authToken, searchUsers);

//Message Routes
router.post("/message/send-message/:id", authToken, sendMessage);
router.get("/message/get-message/:id", authToken, getMessage);

export default router;