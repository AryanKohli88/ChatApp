import Conversation from '../models/conversationmodel.js'
import Message from '../models/messagemodel.js';

export const sendMessage = async (req, res)=>{
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }, 
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newmsg = new Message({
            senderId, receiverId, message
        })

        if(newmsg){
            conversation.messages.push(newmsg.id);
        }

        await conversation.save();
        await newmsg.save();
        console.log(`Message sent from ${senderId} to ${receiverId}.`);
        res.status(201).json({newmsg});

    } catch(error){
        console.log("Error in message controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }

};

export const getMessages = async (req, res)=>{
    try{
        const {id: receiverId} = req.params;
        const senderId = req.user.id;

        let conversations = await Conversation.findOne({
            participants: {  $all: [senderId, receiverId] },
        }).populate("messages"); // now it will store not references to message, but the messages themselves.

        if(!conversations) res.status(200).json([]);
        
        res.status(200).json(conversations.messages);



    } catch (error){
        console.log("Error in message controller (getmessage): ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};