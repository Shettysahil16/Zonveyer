import React from 'react'
import ChatUser from '../right/ChatUser'
import Chat from '../right/Chat'
import SendMessage from '../right/SendMessage'

function Timepass() {
    return (
        <div className='block sm:hidden'>
            <ChatUser />
            <div className='h-[calc(100vh-145px)]'>
                <Chat />
            </div>
            <SendMessage />
        </div>
    )
}

export default Timepass
