// /components/AIFeaturesDropdown.tsx
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Wand2, MessageSquare, FileText, Globe } from 'lucide-react';

const AIFeaturesDropdown = () => {
  const handleAIAction = (action: string) => {
    // Implement AI action logic here
    console.log(`AI action: ${action}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Wand2 className="w-4 h-4 mr-2" />
          AI Features
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleAIAction('ask')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Ask AI</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAIAction('generate')}>
          <Wand2 className="mr-2 h-4 w-4" />
          <span>Generate Content</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAIAction('summarize')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Summarize Document</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAIAction('translate')}>
          <Globe className="mr-2 h-4 w-4" />
          <span>Translate Document</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AIFeaturesDropdown;