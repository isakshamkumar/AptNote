// /components/ShareModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
};

const ShareModal = ({ isOpen, onClose, roomId }: ShareModalProps) => {
  const shareLink = `https://your-domain.com/rooms/${roomId}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this document</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={shareLink} readOnly />
          <Button onClick={() => navigator.clipboard.writeText(shareLink)}>
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;