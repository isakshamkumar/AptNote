import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const AvatarGroup = () => (
  <div className="flex -space-x-2">
    {[...Array(3)].map((_, i) => (
      <Avatar key={i} className="border-2 border-gray-800">
        <AvatarImage src={`https://i.pravatar.cc/150?img=${i+1}`} />
        <AvatarFallback>U{i+1}</AvatarFallback>
      </Avatar>
    ))}
    <Button variant="ghost" size="icon" className="rounded-full bg-gray-700 text-gray-300">
      <Plus className="w-4 h-4" />
    </Button>
  </div>
);

export default AvatarGroup;