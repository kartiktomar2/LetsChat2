import React from 'react'
import Search from './Search.jsx'
import Users from './Users.jsx'
import Logout from './Logout.jsx'

function Left() {
  return (
    <div className='w-full   bg-slate-950    text-gray-300  md:w-full '>
        <Search/>

        <div className='  overflow-y-auto '  style={{minHeight:"calc(83vh - 10vh)"}}>
        <Users/>
        </div>
        
        <Logout/>
    </div>
  )
}

export default Left
