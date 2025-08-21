import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import circleLoading from '../assets/Processing Circle.gif';
import Spinner from '../components/Spinner';

function Signup() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {
            setLoading(true);
            try {
                setLoading(true);
                const dataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URI}api/signup`, {
                    method: "post",
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const userData = await dataResponse.json();
                setLoading(false);

                if (userData.success) {
                    toast.success(userData.message);
                    navigate("/login");
                    
                } else if (userData.error) {
                    toast.error(userData.message);
                }
            } catch (error) {
                //setLoading(false);
                toast.error("An error occurred while signing up." + error);
            }
        } else {
            toast.error("Passwords do not match.");
        }

    };

    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                {loading && <Spinner/>}
                <div className='bg-white text-black container mx-auto max-w-xl max-h-[70%] shadow-md p-4'>
                    <p className='text-center text-3xl font-semibold mb-4'>Signup</p>
                    <form className='flex flex-col gap-4'>
                        <div>
                            <label className="font-medium">Username: </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleOnChange}
                                    required
                                    value={data.username}
                                    placeholder="Enter username"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>
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
                                {data.password && (
                                    <div
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Confirm Password: </label>
                            <div className="bg-slate-200 p-2 rounded flex items-center mt-2">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    onChange={handleOnChange}
                                    required
                                    value={data.confirmPassword}
                                    placeholder="Enter password"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                                {data.confirmPassword && (
                                    <div
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="text-lg flex w-fit ml-auto my-1">
                        Already have an account?
                        <Link to={"/login"} className="hover:text-orange-500 hover:underline text-green-400 cursor-pointer">
                            Login
                        </Link>
                    </div>
                    <button
                        onClick={handleOnSubmit}
                        type="submit"
                        className="bg-green-500 text-white w-full max-w-[130px] block mx-auto m-4 py-3 rounded-full hover:scale-110 transition-all text-xl cursor-pointer"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup
