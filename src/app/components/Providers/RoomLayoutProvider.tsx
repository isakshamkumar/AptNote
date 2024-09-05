"use client"
import React, { useState } from 'react'
import SideBar from '../SideBar'
import Header from '../Header'

type Props = {
    children:React.ReactNode
}

const RoomLayoutProvider = ({children}: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex">
           <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
           <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out" style={{ marginLeft: sidebarOpen ? '16rem' : '0' }}>

           <Header setSidebarOpen={setSidebarOpen}/>
           {children}
           </div>


    </div>
  )
}

export default RoomLayoutProvider