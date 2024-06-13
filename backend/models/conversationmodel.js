import mongoose, { mongo } from "mongoose";

const consvSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, {timestamps: true})

const conv = mongoose.model("Conversation", consvSchema);

export default conv;