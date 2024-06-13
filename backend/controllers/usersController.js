import usermodel from "../models/userModel.js";

export const getusersforSideBar = async (req,res)=>{
    try{
        const loggedinUser = req.user.id;
        const allUsers = await usermodel.find({ id: {$ne: loggedinUser} }).select("-password")

        res.status(200).json(allUsers);
        

    } catch(error) {
        console.error("Error in getusersforSideBar", error.message);
        res.status(500).json({ error: "Internal error" });
    }

}