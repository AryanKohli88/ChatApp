import jwt from 'jsonwebtoken'

const generateTokenandsestCookie = (userID,res)=>{
    const token = jwt.sign({userID}, process.env.JWT_TOKEN, {
        expiresIn: '3h'
    });

    res.cookie("jwt", token, {
        maxAge: 3*60*60*1000,
        httpOnly: true, // this prevents XSS attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenandsestCookie;