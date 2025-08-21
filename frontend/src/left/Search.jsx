import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className='w-full'>
            <label className='flex p-2'>
                <input type="search" className='bg-slate-950 border-2 rounded-md border-slate-900 w-full p-2' placeholder='🔍 Search' />
            </label>
        </div>
    )
}

export default Search
