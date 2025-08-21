import React, { useState } from 'react';
import { MdLogout } from "react-icons/md";
import Logout from '../components/Logout';

function FirstLeft() {
  const [isLogoutVisible , setIsLogoutVisible] = useState(false);
  return (
    <div className='w-16 bg-slate-950 shadow-xl flex justify-center items-end'>
      <div className='tooltip align-bottom mb-20 text-2xl md:text-3xl bg-slate-800 rounded-md p-2 hover:bg-slate-600 cursor-pointer' data-tip="Logout">
        <MdLogout onClick={() => setIsLogoutVisible(!isLogoutVisible)}/>
      </div>
        {
          isLogoutVisible && (
            <Logout onClose={() => setIsLogoutVisible(!isLogoutVisible)}/>
          )
        }
    </div>
  )
}

export default FirstLeft
