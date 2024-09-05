"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Plus, FileText, Users, Clock, Share2, Search, Menu, X, Home, Settings, HelpCircle, ChevronDown, Command } from 'lucide-react';
const RoomsPage = () => {
  type UserRooms= {
    id: number;
    name: string;
    lastEdited: string;
    collaborators: number;
    access: string;
}[]
  const [rooms, setRooms] = useState<UserRooms>([
    { id: 1, name: "Project Brainstorm", lastEdited: "2 hours ago", collaborators: 3, access: "owner" },
    { id: 2, name: "Meeting Notes", lastEdited: "Yesterday", collaborators: 2, access: "editor" },
    { id: 3, name: "Product Roadmap", lastEdited: "3 days ago", collaborators: 5, access: "viewer" },
  ]);

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

      
  );
};

export default RoomsPage;