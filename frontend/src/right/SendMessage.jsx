import React, { useState } from 'react'
import { LuSendHorizontal } from "react-icons/lu";
import useSendMessage from '../state_manage/useSendMessage';

function SendMessage() {
    const [message, setMessage] = useState("");
    const { sendMessage } = useSendMessage();
    //console.log(message);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await sendMessage(message);
        setMessage("");
    };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='bg-slate-900 mx-1'>
                <div className='flex items-center gap-2 py-2'>
                    <div className='w-full'>
                        <input 
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} 
                        className='w-full border-2 rounded-md border-slate-900 p-2' 
                        placeholder='Type a message' />
                    </div>
                    <button className='text-2xl pr-4' >
                        <LuSendHorizontal/>
                    </button>
                </div>
            </div>
            </form>
        </>
    )
}

export default SendMessage
