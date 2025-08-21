import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../state_manage/useConversation';
import chatSound from '../assets/notification tone.mp3';
import notificationSound from '../assets/iphone notification.mp3';
import { toast, Slide } from 'react-toastify';

function UseGetSocketMessage() {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log("newMessage", newMessage);
            const isCurrentChat = selectedConversation && newMessage.conversationParticipants.includes(selectedConversation._id);

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
                toast(<span>
                    New message from <span style={{ color: 'green', fontWeight: 'bold' }}>{newMessage.senderName}</span>
                </span>, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                // you can add "unread messages" counter logic here
            }
        };

        socket.on("new-message", handleNewMessage);

        return () => socket.off("new-message", handleNewMessage);
    }, [socket, selectedConversation, messages, setMessages]);

    return null;
}

export default UseGetSocketMessage;