import React from "react";
import useConversation from "./useConversation";
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
      console.log("selectedUser", selectedConversation);

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
      //console.log("userMessage", userMessage);

      if (userMessage.success) {
        const receiver = sortedUsersData.find(
          (v) => v._id === selectedConversation._id
        );
        const receiverIndex = sortedUsersData.findIndex(
          (v) => v._id === selectedConversation._id
        );
        const newSortedUsersData = sortedUsersData.filter(
          (_, index) => index !== receiverIndex
        );
        setSortedUsersData([receiver, ...newSortedUsersData]);
        //console.log("userMessage",userMessage.data.message);
        setMessages([...messages, userMessage.data]);
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
