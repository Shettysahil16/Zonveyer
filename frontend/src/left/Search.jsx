import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useUserSearch } from '../context/UserSearchContext';
//import { toast } from 'react-toastify';

function Search() {
    const { searchedUserDetails, setSearchedUserDetails, setHasValue } = useUserSearch();
    const [searchValue, setSearchValue] = useState("");

    const fetchSearchUser = async (e) => {
        try {
            const value = e.target.value;
            setSearchValue(value);
            setHasValue(value.trim().length > 0);
            const dataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URI}api/search-users`, {
                method: "post",
                credentials: 'include',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ userName: value }),
            })
            const searchedUser = await dataResponse.json();
            
            if(searchedUser.success){
                setSearchedUserDetails(searchedUser.data);
                //console.log("searchedUserDetails", searchedUserDetails);
                
            }

        } catch (error) {
            console.log("error in searching user" + error);
        }
    }
    return (
        <div className='w-full'>
            <label className='flex p-2'>
                <input type="search" className='bg-slate-950 border-2 rounded-md border-slate-900 w-full p-2' placeholder='🔍 Search' value={searchValue} onChange={fetchSearchUser} />
            </label>
        </div>
    )
}

export default Search
