import React from 'react';
import ChatUser from './ChatUser';
import Chat from './Chat';
import SendMessage from './SendMessage';
import useConversation from '../state_manage/useConversation';
import { BsWhatsapp } from "react-icons/bs";
//import { useAuth } from '../context/AuthProvider';

function Right() {
  const { selectedConversation } = useConversation();
  //console.log("selectedConversation", selectedConversation);
  //const {authUser} = useAuth();
  //console.log(JSON.parse(localStorage.getItem("messenger")));

  //console.log("AuthUser in consumer:", authUser);

  return (
    <div className='h-screen w-full bg-slate-950 text-white'>
      {
        selectedConversation === null && (
          <div className='h-full flex flex-col justify-center items-center'>
            <div className='text-3xl my-4 flex flex-col justify-center items-center gap-4'>
              <BsWhatsapp className='text-6xl text-slate-500' />
              <p>Zonveyer for Windows</p>
            </div>
            <p className='text-center text-slate-400'>Send and receive messages without keeping your phone online.</p>
            <p className='text-slate-400'>Select a chat to start conversation.</p>
          </div>
        )
      }
      {
        selectedConversation && (
          <div>
            <ChatUser />
            <div className='h-[calc(100vh-145px)]'>
              <Chat />
            </div>
            <SendMessage />
          </div>
        )
      }
    </div>
  )
}

export default Right

