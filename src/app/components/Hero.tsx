"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {}

const Hero = (props: Props) => {
const router= useRouter()

const scrollToFeature = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  const featureSection = document.getElementById('feature');
  if (featureSection) {
    featureSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <section className="hero relative overflow-hidden pt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
          Collaborative editing
          <br />
          powered by AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Experience the future of document editing with <FeatureTag text="Real-time Collaboration" color="blue" />, 
          <FeatureTag text="AI-Powered Writing" color="green" />, and <FeatureTag text="Smart Summarization" color="pink" />. 
          Elevate your team productivity to new heights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={()=>router.push('/sign-up')} className="px-8 py-4 bg-white text-black rounded-md text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
            Start writing for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <a 
              href="#feature" 
              onClick={scrollToFeature}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-md text-lg font-semibold transition duration-300 ease-in-out"
            >
              Watch demo
            </a>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
  </section>
  )
}

export default Hero

const FeatureTag: React.FC<{ text: string; color: string }> = ({ text, color }) => {
    const colorClasses:{[key:string]:string} = {
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
      pink: "bg-pink-500/20 text-pink-400",
    };
  
    return (
      <span className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${colorClasses[color]}`}>
        {text}
      </span>
    );
  };