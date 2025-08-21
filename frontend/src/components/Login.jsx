import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
//import circleLoading from '../assets/Processing Circle.gif';
import Spinner from '../components/Spinner';

function Login() {
    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useAuth();
    //console.log("AuthUser in consumer:", authUser);
    
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URI}api/login`, {
            method: "post",
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const loggedUser = await dataResponse.json();
        setLoading(false);
        if (loggedUser.success) {
            navigate("/");
            toast.success(loggedUser.message);
            localStorage.setItem("messenger", JSON.stringify(loggedUser.data));
            //console.log(loggedUser.data);
            setAuthUser(loggedUser.data);
            //console.log("Logged user data:", loggedUser.data);

        }
        if (loggedUser.error) {
            toast.error(loggedUser.message);
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                {loading && <Spinner/>}
                <div className='bg-white text-black container mx-auto max-w-lg max-h-[70%] shadow-md p-4'>
                    <p className='text-center text-3xl font-semibold mb-4'>Login</p>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className="font-medium">Email: </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleOnChange}
                                    required
                                    value={data.email}
                                    placeholder="Enter email"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Password: </label>
                            <div className="bg-slate-200 p-2 rounded flex items-center mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleOnChange}
                                    required
                                    value={data.password}
                                    placeholder="Enter password"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                                {
                                    data.password && (
                                        <div className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? (<IoMdEyeOff />) : (<IoMdEye />)
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-lg flex w-fit ml-auto my-1">
                        Don't have an account?
                        <Link to={"/signup"} className="hover:text-orange-500 hover:underline text-green-400 cursor-pointer">
                            signup
                        </Link>
                    </div>
                    <button
                        onClick={handleOnSubmit}
                        type="submit"
                        className="bg-green-500 text-white w-full max-w-[130px] block mx-auto m-4 py-3 rounded-full hover:scale-110 transition-all text-xl cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login
