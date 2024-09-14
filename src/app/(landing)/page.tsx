import React from 'react';
import { ArrowRight, Edit3, TextCursor, Sparkles, FileText } from 'lucide-react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Feature from '../components/Feature';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
     <Nav/>
   

     <Hero/>
     <Feature/>
    </div>
  );
};






export default LandingPage;