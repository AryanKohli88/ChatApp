// sequence of exports does not matter here if all of them are being imported together and are independent

export const signupController = (req, res)=>{
    console.log("Signup Route");
    res.send("Signup Page!");
}

export const loginController =  (req, res)=>{
    console.log("Login Route");
    res.send("Login Page!");
} 


export const logoutController = (req, res)=>{
    console.log("Logout Route");
    res.send("Logout Page!");
}