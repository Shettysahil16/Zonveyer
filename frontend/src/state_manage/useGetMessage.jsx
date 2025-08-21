import React, { useEffect, useState } from 'react'
import useConversation from './useConversation'

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    useEffect(() => {
        const fetchUserMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const dataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URI}api/message/get-message/${selectedConversation?._id}`, {
                        method: "get",
                        credentials: 'include',
                        headers: {
                            "content-type": "application/json",
                        },
                    });
                    const userMessage = await dataResponse.json();
                    //console.log("Messages array:", userMessage.data);
                    // console.log("Response from sending message:", userMessage);
                    // console.log("Response from server:", userMessage);
                    // console.log("Message inside response:", userMessage.data.message);

                    setLoading(false);
                    if (userMessage.success) {
                        setMessages(userMessage.data || []);
                    }
                    else {
                        setMessages([]); // fallback if not successful
                    }
                }
                catch (error) {
                    console.log("error in fetching user messages" + error);
                }
                finally {
                    setLoading(false); // ✅ always turn off loading
                }
            }
            else {
                // No conversation selected, clear messages
                setMessages([]);
                setLoading(false);
            }
        };
        fetchUserMessages();
    }, [selectedConversation, setMessages])
    return {
        messages: messages || [],
        loading,
    }
}

export default useGetMessage
