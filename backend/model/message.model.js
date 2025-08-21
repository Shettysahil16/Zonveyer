import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
  },
}, {
  timestamps: true,
});

const messageModel = mongoose.model('messageModel', messageSchema);
export default messageModel;
