import React from 'react'
import Search from './Search'
import User from './User'
import Topbar from './Topbar'

function Left() {
  return (
    <div className='w-full bg-black text-white border-r-2 border-slate-800'>
      <Topbar/>
      <Search/>
      <hr className='mt-2'></hr>
      <User/>
    </div>
  )
}

export default Left
