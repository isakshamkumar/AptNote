"use client"
import { Menu, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

type Props = {
    setSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({setSidebarOpen}: Props) => {
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
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <button onClick={() => setSidebarOpen(prev=>!prev)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
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
              {/* {user && user.imageUrl && (
                <img src={user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-400" />
              )} */}
            </div>
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
        </header>
  )
}

export default Header