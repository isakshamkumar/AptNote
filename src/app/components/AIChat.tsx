import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Bot, User } from 'lucide-react';
import * as Y from 'yjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAndSidebar } from '../context/ThemeContext';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
};

// Custom renderer for code blocks
const CodeRenderer: React.FC<{
  language: string | undefined;
  value: string;
  theme: 'dark' | 'light';
}> = ({ language, value, theme }) => {
  return (
    <SyntaxHighlighter
      style={theme === 'dark' ? vscDarkPlus : vs}
      language={language || 'text'}
      PreTag="div"
    >
      {value}
    </SyntaxHighlighter>
  );
};

const AIChat: React.FC<{ isOpen: boolean; onClose: () => void, doc: Y.Doc }> = ({ isOpen, onClose, doc }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, startTransition] = useTransition();
  const { theme } = useThemeAndSidebar();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = { id: Date.now(), content: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
  
    startTransition(async () => {
      const documentData = doc.getXmlFragment("document-store").toJSON();
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}/chatToDocument`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            documentData,
            question: userMessage.content
          })
        });
        
        const data = await response.json();
        setMessages(prev => [...prev, { id: Date.now(), content: data.message, sender: 'ai' as const }]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages(prev => [...prev, { id: Date.now(), content: "Sorry, I couldn't process your request. Please try again.", sender: 'ai' as const }]);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[700px] h-[80vh] flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Chat with AI Assistant</DialogTitle>
        </DialogHeader>
        <div className={`flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-lg shadow-md ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : theme === 'dark' ? 'bg-gray-600 text-gray-100' : 'bg-white'
                  }`}>
                    {message.sender === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        className={`prose prose-sm max-w-none ${theme === 'dark' ? 'dark:prose-invert' : ''}`}
                        components={{
                          code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : undefined;
                            const value = String(children).replace(/\n$/, '');
                            
                            return !inline ? (
                              <CodeRenderer language={language} value={value} theme={theme === 'dark' ? 'dark' : 'light'} />
                            ) : (
                              <code className={className} {...props}>
                                {value}
                              </code>
                            );
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  <div className={`flex-shrink-0 ${message.sender === 'user' ? 'bg-blue-500' : theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'} p-2 rounded-full`}>
                    {message.sender === 'user' ? <User size={16} color="white" /> : <Bot size={16} color={theme === 'dark' ? 'white' : 'black'} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex space-x-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask something about the document..."
            className={`flex-1 ${theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spins" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AIChat;