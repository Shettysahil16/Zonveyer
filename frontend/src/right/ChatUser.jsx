import React from "react";
import { Link } from "react-router-dom";
import useConversation from "../state_manage/useConversation.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";
import { FaArrowLeft } from "react-icons/fa6";

function ChatUser() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  //console.log(selectedConversation);
  const { onlineUsers, typingUser } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const isTyping = typingUser === selectedConversation._id;
  //console.log("isOnline", isOnline);

  return (
    <>
      <div className="border-b-2 border-slate-800 bg-black h-20 w-full px-2">
        <div className="h-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* onClick is used to go to users page in mobile screen */}
            <FaArrowLeft
              className="text-xl sm:hidden"
              onClick={() => setSelectedConversation(null)}
            />
            <div>
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral border border-white text-neutral-content w-10 rounded-full">
                  <span className="text-xl capitalize font-bold">
                    {selectedConversation?.username.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">
                {selectedConversation?.username}
              </p>
              {isTyping ? (
                <p className="text-xs font-medium text-green-400">typing...</p>
              ) : (
                isOnline && <p className="text-xs">Online</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatUser;
