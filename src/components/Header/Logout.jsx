import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/AuthSlice'
import authServiece from '../../Appwrite/auth'

function Logout() {
    const dispatch = useDispatch()
    const logoutHandler=()=>{
        authServiece.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </button>
  )
}

export default Logout
