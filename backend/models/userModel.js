import mongoose, { mongo } from "mongoose";
import { Passport } from "passport";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    gender:{
        type: String,
        required: true,
        enum:["Male", "Female"]
    },
    profilePic:{
        type: String,
        default: ""
    }
});

const User = mongoose.model("User", userSchema);
export default User;
