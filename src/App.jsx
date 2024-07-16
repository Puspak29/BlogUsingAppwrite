
import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authServiece from './Appwrite/auth'
import { logout } from './Store/AuthSlice'
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading]= useState(true)
  const dispatch= useDispatch()

  useEffect(()=>{
    authServiece.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    }).finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div>
      <div>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
