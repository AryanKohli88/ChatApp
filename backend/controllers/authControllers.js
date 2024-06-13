// sequence of exports does not matter here if all of them are being imported together and are independent

import User from "../models/userModel.js"
import generateTokenandsestCookie from "../utils/generatetokens.js";
import bcryptjs from "bcryptjs"

export const signupController = async (req, res)=>{

    try{
        const { fullName, username, password, confirmpassword, gender } = req.body;

        if(password.length < 6)
        {
            return res.status(400).json({error:"Password too short."})   
        }
        
        if(password !== confirmpassword)
        {
            return res.status(400).json({error:"Passwords Do Not Match."})
        }
        
        // findOne functions is given by mongoose to look up for a value in the column (Java equivalent for a column name in this can be a Class Name) of Users
        // WHy username and not fullName? because username is defined as the unique key in usermodel.js
        const user = await User.findOne({username});

        if(user)
        {
            return res.status(400).json({error:"Username already exists"})
        }

        //HASH PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);
        
        const boyPic = `http://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `http://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullName: fullName,
            username: username,
            password: hashedpassword,
            gender: gender,
            profilePic: gender === "male" ? boyPic:girlPic
        })

        generateTokenandsestCookie(newuser.id, res);
        await newuser.save();

        // Now that this user's object is created, and we have saved it in mongodb, we return some information as resposne.
        res.status(201).json({
            id: newuser.id,
            fullName: newuser.fullName,
            username: newuser.username,
            profilePic: newuser.profilePic
        })

    } catch(error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({error: "FAILED"});
    }



    console.log("Signup Route");
    // res.send("Signup Page!");
}

export const loginController = async (req, res)=>{

    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});

        // check password
        if(!user)
        {
            return res.status(400).json({error: "User doesn't exist"});
        }

        const ispasswordcorrect = await bcryptjs.compare(password, user.password);

        if(!ispasswordcorrect)
        {
            return res.status(400).json({error: "Incorrect Password"});   
        }

        // Alternate method
        // const ispasswordcorrect = await bcryptjs.compare(password, user?.password || ""); // -> if user exists compare it with user's password else compare with an empty string.

        generateTokenandsestCookie(user.id, res);

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in Login controller:", error.message);
        res.status(500).json({error: "FAILED"});
    }



    console.log("Login Route");
    // res.send("Login Page!");
} 

// No need of async for logout
export const logoutController = (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message :"Logged out successfully."})
    } catch (error) {
        console.log("Error in Logout controller:", error.message);
        res.status(500).json({error: "FAILED"});
    }
    console.log("Logout Route");
    // res.send("Logout Page!");
}