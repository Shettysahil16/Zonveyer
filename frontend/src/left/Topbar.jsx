import React from 'react'
import { FaRegEdit } from "react-icons/fa";

function Topbar() {
  return (
    <div>
      <div className='inset-0 flex justify-between items-center my-1 p-2'>
        <div className='text-2xl font-bold py-2'>
            Zonveyer
        </div>
        <div className='tooltip tooltip-bottom text-2xl hover:bg-slate-500 p-2 duration-200 rounded-sm cursor-pointer' data-tip="New Group">
            <FaRegEdit />
        </div>
    </div>
    </div>
  )
}

export default Topbar
