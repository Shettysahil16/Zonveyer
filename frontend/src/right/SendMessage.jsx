import React, { useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import useSendMessage from "../state_manage/useSendMessage";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../state_manage/useConversation";

function SendMessage() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const typingTimeout = useRef(null);
  const senderUserId = JSON.parse(localStorage.getItem("messenger"))?._id;

  const handleChange = (e) => {
    setMessage(e.target.value);

    if (socket && selectedConversation) {
      // emit typing event
      socket.emit("typing", {
        receiverId: selectedConversation._id,
        senderId: senderUserId,
      });

      // clear old timeout
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      // after 1.5s of no typing -> stop typing
      typingTimeout.current = setTimeout(() => {
        socket.emit("stop-typing", {
          receiverId: selectedConversation._id,
          senderId: senderUserId,
        });
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");

    if (socket && selectedConversation) {
      socket.emit("stop-typing", {
        receiverId: selectedConversation._id,
        senderId: socket.id,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-900 mx-1">
          <div className="flex items-center gap-2 py-2">
            <div className="w-full">
              <input
                type="text"
                value={message}
                onChange={handleChange}
                className="w-full border-2 rounded-md border-slate-900 p-2"
                placeholder="Type a message"
              />
            </div>
            <button className="text-2xl pr-4">
              <LuSendHorizontal />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SendMessage;
