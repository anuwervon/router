import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { url } from '../home/home'

const User = () => {
    const {id} = useParams()
    const [user,setUser] = useState<{}>({})
    async function get(id:string | number | undefined) {
        try {
            const {data} = await axios.get(`${url}/${id}`)
            setUser(data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        get(id)
    },[id])
  return (
    <div className='p-[50px] text-[18px]'>
        <h1 className='font-medium text-[30px]'>Hello everybody 👋</h1>
        <h1>My name is <span className='text-[20px] font-medium'>{user.name}</span>.I'm a <span className='text-[20px] font-medium'>{user.job}</span> in SoftClub Academy.</h1>
         <p>My Email: <span className='font-medium text-[20px]'>{user.email}</span></p>
         <p>My Phone: <span className='font-medium text-[20px]'>{user.phone}</span></p>
         <p>I'm {user.age} years old </p>
    </div>
  )
}

export default User