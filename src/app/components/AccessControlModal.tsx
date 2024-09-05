// /components/AccessControlModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from 'lucide-react';

type AccessControlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
};

const AccessControlModal = ({ isOpen, onClose, roomId }: AccessControlModalProps) => {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
  ]);

  const handleAddUser = () => {
    // Implement user addition logic here
    console.log(`Adding user: ${email} to room: ${roomId}`);
    setUsers([...users, { id: users.length + 1, email }]);
    setEmail('');
  };

  const handleRemoveUser = (userId: number) => {
    // Implement user removal logic here
    console.log(`Removing user with id: ${userId} from room: ${roomId}`);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Access</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
            />
            <Button onClick={handleAddUser}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="flex justify-between items-center">
                <span>{user.email}</span>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveUser(user.id)}>
                  <UserMinus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessControlModal;