// /components/Editor.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { useRoom } from '@liveblocks/react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import '../css/editor-custom.css'
import { Button } from "@/components/ui/button";
import { Share2, UserPlus, Wand2, Globe, FileText, MessageSquare, Sun, Moon } from 'lucide-react';
import AIFeaturesDropdown from './AIFeaturesDropdown';
import ShareModal from './ShareModal';
import AccessControlModal from './AccessControlModal';
import { useTheme } from '../context/ThemeContext';

type EditorProps = {
  roomId: string;
  isOwner: boolean;
};

const Editor = ({ roomId, isOwner }: EditorProps) => {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isAccessControlModalOpen, setIsAccessControlModalOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
  
    useEffect(() => {
      const yDoc = new Y.Doc();
      const yProvider = new LiveblocksYjsProvider(room, yDoc);
      setDoc(yDoc);
      setProvider(yProvider);
  
      return () => {
        yProvider.destroy();
        yDoc.destroy();
      };
    }, [room]);
  
    useEffect(() => {
      const editor = document.querySelector(".ProseMirror");
      if (editor) {
        editor.dispatchEvent(new Event("focus"));
      }
    }, [])
  
    if (!doc || !provider) return null;
  
    return (
      <div className={`h-full overflow-auto p-4 ${theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-gray-100 text-black'}`}>
        <div className="max-w-4xl mx-auto">
          <EditorToolbar 
            isOwner={isOwner}
            onShare={() => setIsShareModalOpen(true)}
            onManageAccess={() => setIsAccessControlModalOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className={`shadow-lg overflow-hidden mt-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <BlockNote doc={doc} provider={provider} theme={theme} />
          </div>
        </div>
      
        {isOwner && (
          <AccessControlModal 
            isOpen={isAccessControlModalOpen} 
            onClose={() => setIsAccessControlModalOpen(false)} 
            roomId={roomId} 
          />
        )}
        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          roomId={roomId} 
        />
      </div>
    );
  };
  
  const EditorToolbar = ({ isOwner, onShare, onManageAccess, theme, toggleTheme }:{isOwner:boolean, onShare:()=>void, onManageAccess:()=>void, theme:string, toggleTheme:()=>void}) => {
    return (
      <div className={`p-2 rounded-t-lg flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className='flex gap-2'>
          <AIFeaturesDropdown />
          {isOwner && (
            <Button variant="outline" size="sm" onClick={onManageAccess}>
              <UserPlus className="w-4 h-4 mr-2" />
              Manage Access
            </Button>
          )}
        </div>
        <div className='flex gap-2'>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    );
  };
  
  const BlockNote = ({ doc, provider, theme }:{doc:Y.Doc, provider:LiveblocksYjsProvider, theme:"light" | "dark"}) => {
    const editor = useCreateBlockNote({
      collaboration: {
        provider,
        fragment: doc.getXmlFragment("document-store"),
        user: {
          name: 'Anonymous',
          color: theme === 'dark' ? '#ffffff' : '#000000',
        },
      },
      domAttributes: {
        editor: {
          class: "outline-none",
        },
      },
    });
  
    return (
      <BlockNoteView 
        suppressContentEditableWarning
        suppressHydrationWarning
        editor={editor}
        theme={theme}
        className="min-h-[calc(100vh-10rem)] p-8"
      />
    );
  };
  
  export default Editor;