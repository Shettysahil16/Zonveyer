import React from "react";
import useConversation from "./useConversation";
import sentSound from "../assets/message_sent_sound.mp3";
//import useGetMessage from './useGetMessage';

function useSendMessage() {
  const {
    messages,
    setMessages,
    selectedConversation,
    sortedUsersData,
    setSortedUsersData,
  } = useConversation();
  //const { fetchUserMessages } = useGetMessage();

  const sendMessage = async (message) => {
    try {
      const dataResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}api/message/send-message/${
          selectedConversation?._id
        }`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      //console.log("dataResponse", dataResponse);
      const userMessage = await dataResponse.json();
      console.log("userMessage", userMessage.data.message);

      if (userMessage.success) {
        const receiverIndex = sortedUsersData.findIndex(
          (v) => v._id === selectedConversation._id
        );

        if (receiverIndex === -1) return sortedUsersData;

        const newSortedUsersData = sortedUsersData.filter(
          (_, index) => index !== receiverIndex
        );

        const updatedReceiver = {
          ...sortedUsersData[receiverIndex], // Copy the current sender's data
          lastMessage: userMessage.data,
        };

        setSortedUsersData([updatedReceiver, ...newSortedUsersData]);
        //console.log("userMessage",userMessage.data.message);
        setMessages([...messages, userMessage.data]);
        setTimeout(() => {
          const messageSentSound = new Audio(sentSound);
          messageSentSound.play();
        }, 300);
      }
    } catch (error) {
      console.log("error in sending message" + error);
    }
  };

  return {
    sendMessage,
  };
}

export default useSendMessage;
