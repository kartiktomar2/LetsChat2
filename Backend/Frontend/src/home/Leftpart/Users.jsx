import React from 'react'
import User from './User.jsx'
import useGetAllUsers from '../../context/useGetAllUsers.jsx'

function Users() {

  const[ allUsers,loading]= useGetAllUsers();
  console.log(allUsers);
  
    return (
        <div>
            <h1 className='px-8 py-2 text-white font-semibold bg-[#141423] rounded-md'>Messages</h1>
              <div className='  overflow-y-auto ' style={{maxHeight:"calc(82vh - 10vh)"}}>
                    {
                      allUsers.map((user,index)=>{
                            return <User  key={index} user={user} />
                      })
                    }
              </div>
        </div>
    )
}

export default Users
