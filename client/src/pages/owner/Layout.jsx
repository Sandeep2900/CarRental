import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import SIdebar from '../../components/owner/SIdebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner, navigate])

  return (
    
    <div className='flex flex-col'>
      <NavbarOwner/>
      <div className='flex'>
        <SIdebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
