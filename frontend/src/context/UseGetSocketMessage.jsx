import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../state_manage/useConversation";
import chatSound from "../assets/notification tone.mp3";
import notificationSound from "../assets/iphone notification.mp3";
import { toast, Slide } from "react-toastify";

function UseGetSocketMessage() {
  const { socket } = useSocketContext();
  const {
    messages,
    setMessages,
    selectedConversation,
    conversations,
    sortedUsersData,
    setSortedUsersData,
  } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("newMessage", newMessage);

      const sender = sortedUsersData.find((v) => v._id === newMessage.senderId);
      //console.log("sender", sender);
      const senderIndex = sortedUsersData.findIndex(
        (v) => v._id === newMessage.senderId
      );

      const updatedSender = {
        ...sortedUsersData[senderIndex], // Copy the current sender's data
        lastMessage: {
          createdAt: newMessage.createdAt, // Set only createdAt, message, and senderId
          message: newMessage.message,
          senderId: newMessage.senderId,
        },
      };
      //console.log("senderIndex details", updatedSender);

      const newSortedUsersData = sortedUsersData.filter(
        (_, index) => index !== senderIndex
      );

      setSortedUsersData([updatedSender, ...newSortedUsersData]);
      console.log("sorted users in socket", sortedUsersData);

      const isCurrentChat =
        selectedConversation &&
        newMessage.conversationParticipants.includes(selectedConversation._id);
      console.log("conversations in socket", conversations);

      // Only add message if it belongs to the currently open conversation
      if (isCurrentChat) {
        setMessages([...messages, newMessage]);
        setTimeout(() => {
          const chatMsgSound = new Audio(chatSound);
          chatMsgSound.play();
        }, 500);
      } else {
        // Play sound + show notification badge (but don’t put in wrong chat) + delays notification sound to avoid loop
        setTimeout(() => {
          const notificationMsgSound = new Audio(notificationSound);
          notificationMsgSound.play();
        }, 800);
        toast(
          <span>
            New message from{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {newMessage.senderName}
            </span>
          </span>,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          }
        );
        // you can add "unread messages" counter logic here
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => socket.off("new-message", handleNewMessage);
  }, [socket, selectedConversation, messages, setMessages]);

  return null;
}

export default UseGetSocketMessage;
