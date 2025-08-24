import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from 'socket.io-client';
import useConversation from "../state_manage/useConversation";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [authUser] = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { selectedConversation } = useConversation();
    const [typingUser, setTypingUser] = useState(null);

    useEffect(() => {
        if (authUser) {
            const newSocket = io(`${import.meta.env.VITE_BACKEND_URI}`, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(newSocket); // ✅ store the socket you just created

            newSocket.on("get-online", (users) => {
                setOnlineUsers(users);
                //console.log("online",onlineUsers);
            });

            newSocket.on("user-typing", ({ senderId }) => {
                setTypingUser(senderId);
            });

            newSocket.on("user-stop-typing", ({ senderId }) => {
                // only clear if the same user stops typing
                setTypingUser((prev) => (prev === senderId ? null : prev));
            });

            return () => newSocket.close();
        }

        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser, selectedConversation?._id])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, typingUser }}>
            {children}
        </SocketContext.Provider>
    );
};