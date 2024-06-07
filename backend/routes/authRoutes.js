import express from "express";
const router = express.Router();

// Importing Controllers => They tell what will these Routes lead to.
import {loginController, signupController, logoutController} from "../controllers/authControllers.js"

// Why are these routes "post" and not "get"? 
// Because the user is going to enter credentials and then send post request by clicking on respective buttons. 
// These credentials need to be sent for authentication hence we do a POST request.

router.post("/login",loginController);

router.post("/signup", signupController);

router.post("/logout", logoutController);


export default router;