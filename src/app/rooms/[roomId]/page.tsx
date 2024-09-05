// /app/rooms/[roomId]/page.tsx
"use client"

import React from 'react';
import Editor from '@/app/components/Editor';
import RoomHeader from '@/app/components/RoomHeader';
import { useRoom } from '@liveblocks/react';

type Props = {
  params: {
    roomId: string;
  };
};

const RoomPage = ({ params }: Props) => {
  const room = useRoom();

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      <RoomHeader  isOwner={true} roomName="Untitled" roomId={params.roomId} />
      <main className="flex-1 overflow-hidden">
        <Editor isOwner={true} roomId={params.roomId} />
      </main>
    </div>
  );
};

export default RoomPage;