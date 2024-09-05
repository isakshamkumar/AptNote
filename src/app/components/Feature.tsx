import React from 'react'
import { Edit3, FileText, Sparkles, TextCursor } from 'lucide-react';

type Props = {}

const Feature = (props: Props) => {
  return (
    <section className="features py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Supercharge Your Writing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Edit3 className="h-10 w-10 text-blue-400" />}
              title="Real-Time Text Editor"
              description="Collaborate seamlessly with your team in real-time. See changes instantly as they happen."
            />
            <FeatureCard
              icon={<TextCursor className="h-10 w-10 text-green-400" />}
              title="Real-Time Cursors"
              description="Always know where your teammates are working with live cursor tracking."
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-purple-400" />}
              title="AI-Powered Generation"
              description="Let AI assist you in generating ideas, expanding on concepts, or even writing entire sections."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-pink-400" />}
              title="Smart Summarization"
              description="Quickly grasp the essence of any document with AI-generated summaries."
            />
          </div>
        </div>
      </section>
  )
}

export default Feature

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
    return (
      <div className="bg-gray-800 rounded-xl p-8 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  };