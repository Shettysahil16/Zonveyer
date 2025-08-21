import React, { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Spinner from '../components/Spinner';


function Logout({ onClose }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ authUser, setAuthUser ] = useAuth();
    //console.log("logout", authUser);
    
    const handleUserLogout = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const fetchData = await fetch('http://localhost:5002/api/user-logout', {
                method: 'get',
                credentials: 'include',
            })

            const userLoggedOut = await fetchData.json();
            setLoading(false);

            if (userLoggedOut.success) {
                toast.success(userLoggedOut.message);
                localStorage.removeItem("messenger");
                setAuthUser(null);
                navigate("/login");
            }
            else {
                toast.error(userLoggedOut.message || "Logout failed");
            }

        } catch (error) {
            //setLoading(false);
            console.log("error in logout" + error);

        }
    }

    return (
        <div className='h-full w-full fixed inset-0 z-10 flex justify-center items-center'>
            {loading && <Spinner/>}
            <div className='bg-white w-3xl mx-auto h-[20%] text-black relative shadow-md rounded-xs text-3xl'>
                <div className='h-full'>
                    <div className='w-fit ml-auto'>
                        <button className='px-1 py-1 hover:text-red-500 cursor-pointer' onClick={onClose}><MdOutlineCancel /></button>
                    </div>
                    <div className='px-4 font-medium'>
                        Are you sure? do you want to logout
                    </div>
                </div>
                <div className='absolute bottom-2 right-2 flex gap-6'>
                    <button
                        className='border-2 px-7 py-2 rounded-sm cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all'
                        onClick={onClose}
                    >
                        No
                    </button>
                    <button
                        className='border-2 px-7 py-2 rounded-sm cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all'
                        onClick={handleUserLogout}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Logout
