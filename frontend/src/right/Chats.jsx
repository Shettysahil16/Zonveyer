import React from 'react'
//import useConversation from '../state_manage/useConversation';

function Chats({message}) {
    //const { selectedConversation } = useConversation();
    //console.log(message);
    const senderUserInfo = JSON.parse(localStorage.getItem("messenger"));
    const senderUserId = senderUserInfo?._id
    const isUserSender = senderUserId === message?.senderId;

    return (
        <>
            <div className='p-2'>
                <div className={`chat ${isUserSender ? "chat-end" : "chat-start"}`} >
                    <div className={`chat-bubble ${isUserSender ? "chat-bubble-accent" : "chat-bubble-info"}`}>{message?.message}</div>
                </div >
            </div>
        </>
    )
}

export default Chats



{/* <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                        That's never been done in the history of the Jedi.
                    </div>
                </div> */}


//                 import React, { useEffect } from 'react'
// import { useSocketContext } from './SocketContext'
// import useConversation from '../state_manage/useConversation';
// import sound from '../assets/notification tone.mp3'

// function UseGetSocketMessage() {
//     const { socket } = useSocketContext();
//     const { messages, setMessages } = useConversation();

//     useEffect(() => {
//         socket.on("new-message", (newMessages) => {
//             console.log("newMessages", newMessages);
//             const notificationSound = new Audio(sound);
//             notificationSound.play();
//             setMessages([...messages, newMessages])
//         });
//         return () => socket.off("new-message");
//     }, [socket, messages, setMessages])
// }

// export default UseGetSocketMessage
// //setMessages([Array.isArray(messages), newMessages])