import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const protectRoute = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided."});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({ error: "Unauthorised - Invalid user"});
        }

        // console.log("here");
        const user = await User.findById(decoded.userID).select("-password");

        if(!user){
            return res.status(404).json({error: "User Not Found"});
        }

        req.user = user;
        next(); // protectRoute over now go to sendMessage controller

    } catch(error){
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({error: "Internal error"});
    }
}

export default protectRoute;