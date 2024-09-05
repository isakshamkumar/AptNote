"use client"
import { ChevronDown, FileText, Home, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    setSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>
    sidebarOpen:boolean
}
type UserRooms= {
    id: number;
    name: string;
    lastEdited: string;
    collaborators: number;
    access: string;
}[]
const SideBar = ({setSidebarOpen,sidebarOpen}: Props) => {
    const [rooms, setRooms] = useState<UserRooms>([
        { id: 1, name: "Project Brainstorm", lastEdited: "2 hours ago", collaborators: 3, access: "owner" },
        { id: 2, name: "Meeting Notes", lastEdited: "Yesterday", collaborators: 2, access: "editor" },
        { id: 3, name: "Product Roadmap", lastEdited: "3 days ago", collaborators: 5, access: "viewer" },
      ]);
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold">AINotion</h1>
        <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-4">
          <button className="w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700">
            <Home className="w-4 h-4 mr-3" />
            Home
          </button>
        </div>
        <div className="px-3 mb-2">
          <h3 className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Workspaces
            <ChevronDown className="w-4 h-4" />
          </h3>
        </div>
        {rooms.map((room) => (
          <a key={room.id} href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md mx-3">
            <FileText className="w-4 h-4 mr-3 text-gray-400" />
            {room.name}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="w-5 h-5 mr-2" />
          New Room
        </button>
      </div>
    </div>
  </div>
  )
}

export default SideBar