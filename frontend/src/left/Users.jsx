import React from "react";
import useConversation from "../state_manage/useConversation";
import { useSocketContext } from "../context/SocketContext.jsx";

function Users({ allUsersData, loading }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  //console.log("allUsersData", allUsersData.lastMessage?.message);
  const isSelected = selectedConversation?._id === allUsersData?._id;
  const { onlineUsers, typingUser } = useSocketContext();
  const isOnline = onlineUsers.includes(allUsersData._id);
  const isTyping = typingUser === allUsersData._id;
  const showTyping =
    !selectedConversation || selectedConversation?._id !== allUsersData._id;

  function messageDate(dateString) {
    if (!dateString) return "";

    const messageDate = new Date(dateString);
    const now = new Date();

    //Check if the message is from today
    const isSameDay = messageDate.toDateString() === now.toDateString();

    //Check if the message is from yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1); // Go back one day
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    //Format based on which condition is true
    if (isSameDay) {
      return messageDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      // Otherwise, format as dd-mm-yyyy
      const day = String(messageDate.getDate()).padStart(2, "0");
      const month = String(messageDate.getMonth() + 1).padStart(2, "0");
      const year = messageDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  }

  return (
    <>
      <div>
        <div
          className={`h-28 flex items-center relative p-2 gap-4 hover:bg-slate-500 ${
            isSelected ? "bg-slate-500" : ""
          } duration-150 hover:cursor-pointer`}
          onClick={() => setSelectedConversation(allUsersData)}
        >
          <div
            className={`avatar ${
              isOnline ? "avatar-online" : ""
            } avatar-placeholder`}
          >
            <div className="bg-neutral border border-white text-neutral-content w-16 rounded-full">
              <span className="text-3xl font-bold capitalize">
                {allUsersData?.username?.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <div className="flex">
              <p className="font-bold md:text-md truncate">
                {allUsersData?.username}
              </p>

              <p className="text-xs absolute right-2">
                {messageDate(allUsersData?.lastMessage?.createdAt)}
              </p>
            </div>
            {isTyping ? (
              showTyping ? (
                <div
                  className={`text-sm font-medium text-green-400 transform transition-all duration-300 ${
                    isTyping
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1"
                  }`}
                >
                  typing...
                </div>
              ) : (
                <p className="text-sm truncate">
                  {allUsersData.lastMessage?.message}
                </p>
              )
            ) : (
              <p className="text-sm truncate">
                {allUsersData.lastMessage?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
