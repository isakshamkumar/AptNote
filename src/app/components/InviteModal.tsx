import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InviteModal = ({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite Collaborators</DialogTitle>
      </DialogHeader>
      {/* Add invite form here */}
    </DialogContent>
  </Dialog>
);

export default InviteModal;