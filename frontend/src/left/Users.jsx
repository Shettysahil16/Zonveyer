import React from 'react';
import useConversation from '../state_manage/useConversation';
import { useSocketContext } from '../context/SocketContext.jsx';
import circleLoading from '../assets/Processing Circle.gif';
import { Link } from 'react-router-dom';

function Users({ allUsersData, loading }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === allUsersData?._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(allUsersData._id);


    return (
        <>
            <div>
                
                <div className={`h-28 flex items-center p-2 gap-4 hover:bg-slate-500 ${isSelected ? "bg-slate-500" : ""} duration-150 hover:cursor-pointer`} onClick={() => setSelectedConversation(allUsersData)}>
                    <div className={`avatar ${isOnline ? "avatar-online" : ""} avatar-placeholder`}>
                        <div className="bg-neutral border border-white text-neutral-content w-16 rounded-full">
                            <span className="text-3xl font-bold capitalize">{allUsersData?.username?.charAt(0)}</span>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold md:text-xl'>{allUsersData?.username}</p>
                        <p className='md:text-xs lg:text-sm'>{allUsersData?.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users
