"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Plus, FileText, Users, Clock, Share2, Search, Menu, X, Home, Settings, HelpCircle, ChevronDown, Command } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from '../lib/initSupabase';
const RoomsPage = () => {
  type UserRooms= {
    id: number;
    name: string;
    lastEdited: string;
    collaborators: number;
    access: string;
}[]
  const { user } = useUser();
  const [rooms, setRooms] = useState<UserRooms>([
    { id: 1, name: "Project Brainstorm", lastEdited: "2 hours ago", collaborators: 3, access: "owner" },
    { id: 2, name: "Meeting Notes", lastEdited: "Yesterday", collaborators: 2, access: "editor" },
    { id: 3, name: "Product Roadmap", lastEdited: "3 days ago", collaborators: 5, access: "viewer" },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const RoomCard = ({ room}:{room:{
    id: number;
    name: string;
    lastEdited: string;
    collaborators: number;
    access: string;
}}) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-4">
        <FileText className="w-8 h-8 text-blue-500" />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {room.lastEdited}
          </span>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition duration-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{room.name}</h3>
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
        <span className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {room.collaborators} collaborators
        </span>
        <span className={`text-sm px-2 py-1 rounded-full ${
          room.access === 'owner' ? 'bg-green-200 text-green-800' :
          room.access === 'editor' ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'
        }`}>
          {room.access.charAt(0).toUpperCase() + room.access.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex">
      {/* Sidebar */}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out" style={{ marginLeft: sidebarOpen ? '16rem' : '0' }}>
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <Search className="w-4 h-4 mr-2" />
                <span>Search</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-300 dark:bg-gray-600 rounded">⌘K</kbd>
              </button>
              {user && user.imageUrl && (
                <img src={user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-400" />
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Your Rooms</h2>
          </div>

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No rooms yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first room to start collaborating</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center mx-auto transition duration-300">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Room
              </button>
            </div>
          )}
        </main>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Rooms</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Type room name..."
              className="col-span-3"
            />
            {/* Add search results here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;