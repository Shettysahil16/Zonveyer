import React, { useEffect, useRef } from "react";
import Chats from "./Chats";
import useGetMessage from "../state_manage/useGetMessage";
import UseGetSocketMessage from "../context/UseGetSocketMessage";
//import useConversation from '../state_manage/useConversation';
import loadingGif from "../assets/Toaster.gif";

function Chat() {
  const { messages = [], loading } = useGetMessage();
  console.log("type of message", typeof messages);

  console.log("messages", messages);

  //UseGetSocketMessage();

  const lastMessageRef = useRef();
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <UseGetSocketMessage />
      <div className="h-[calc(100vh-145px)] overflow-y-auto scroll-smooth">
        {/* shows when loading is true */}
        {loading && (
          <div className="h-full flex justify-center items-center">
            <img src={loadingGif} alt="loading..." className="h-[20%]" />
          </div>
        )}

        {/* show messages when there is message between users and loading is false */}
        {messages.length === 0 && !loading && (
          <div className="h-full flex justify-center items-center">
            No Messages
          </div>
        )}

        {/* //shows when there is no message between users and loading is false */}
        {messages.length !== 0 &&
          !loading &&
          messages.map((message, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            console.log("prevMessage", prevMessage);

            return (
              <div key={index} ref={lastMessageRef}>
                <Chats message={message} prevMessage={prevMessage} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Chat;
//setMessages([Array.isArray(messages), newMessages])
