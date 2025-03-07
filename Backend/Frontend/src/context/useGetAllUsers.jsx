import React, { useEffect, useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie"
import { useAuth } from './AuthProvider'
function useGetAllUsers() {

     const [allUsers,setAllUsers]= useState([])
     const [loading,setLoading]= useState(false)
    
    
      useEffect( ()=>{
             const getUsers=async()=>{
                setLoading(true)
                try {
                    const token= Cookies.get("jwt")
                    const response =await axios.get("/api/user/allusers",{
                        credentials:"include",
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setAllUsers(response.data);
                    setLoading(false)
                } catch (error) {
                     console.log("Error in useGetAllUsers ", error);
                     
                }

             }
             getUsers()
      },[])
      return [allUsers,loading]
}

export default useGetAllUsers
