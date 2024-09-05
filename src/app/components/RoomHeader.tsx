// /components/RoomHeader.tsx
import React, { useState } from 'react';
import { Menu, Share2, Plus, UserPlus, UserMinus } from 'lucide-react';
import UserMenu from './UserMenu';
import ShareModal from './ShareModal';
import AIFeaturesDropdown from './AIFeaturesDropdown';
import AccessControlModal from './AccessControlModal';
import { Button } from "@/components/ui/button";

type RoomHeaderProps = {
  roomName: string;
  roomId: string;
  isOwner: boolean;
};

const RoomHeader = ({ roomName, roomId, }: RoomHeaderProps) => {
  return (
    <header className="bg-[#252525] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button className="p-1 hover:bg-[#333333] rounded">
          <Menu className="w-5 h-5" />
        </button>
        <input 
          type="text" 
          value={roomName} 
          onChange={() => {}} 
          className="bg-transparent border-none focus:outline-none text-lg font-medium"
        />
      </div>
      <div className="flex items-center space-x-4">
        <UserMenu />
      </div>
     
    </header>
  );
};

export default RoomHeader;