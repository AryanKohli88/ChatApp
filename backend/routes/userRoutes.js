import express from 'express'
const router = express.Router();

import protectRoute from '../middleware/protectRoute.js';

import {getusersforSideBar} from "../controllers/usersController.js";

router.get("/", protectRoute, getusersforSideBar);

export default router;