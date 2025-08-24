import React from 'react'
//import useConversation from '../state_manage/useConversation';

function Chats({ message }) {
    //const { selectedConversation } = useConversation();
    //console.log(message);
    const createdAt = new Date(message?.createdAt);
    const messageTime = createdAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    //console.log("time", messageTime);


    const senderUserInfo = JSON.parse(localStorage.getItem("messenger"));
    const senderUserId = senderUserInfo?._id
    const isUserSender = senderUserId === message?.senderId;

    return (
        <>
            <div className='py-2 px-1'>
                <div className={`chat ${isUserSender ? "chat-end" : "chat-start"}`} >
                    <div
                        className={`chat-bubble relative max-w-[80%] ${isUserSender ? "chat-bubble-accent" : "chat-bubble-info"}`}
                    >
                        {/* Message text */}
                        <div className="break-words whitespace-pre-wrap text-sm pr-12">
                            {message?.message}
                        </div>

                        {/* Time in bottom-right */}
                        <div className="absolute bottom-1 right-2 text-[10px] text-gray-600">
                            {messageTime}
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Chats
