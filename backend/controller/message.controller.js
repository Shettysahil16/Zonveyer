import conversationModel from "../model/conversation.model.js";
import messageModel from "../model/message.model.js";
//import { authToken } from "../middleware/authToken.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";
import User from "../model/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;
    //console.log("senderId",senderId);
    let senderUser = await User.findById(senderId)
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = newMessage._id;
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", {
        ...newMessage.toObject(),
        conversationParticipants : conversation.participants,
        senderName : senderUser.username,
        lastMessage : conversation.lastMessage,
      });
    }

    return res.status(201).json({
      message: "message sent successfully",
      data: newMessage,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in sending message" + error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    let conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation found",
        success: true,
        error: false,
      });
    }

    const messages = conversation.messages;
    return res.status(200).json({
      data: messages,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in getting message" + error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
