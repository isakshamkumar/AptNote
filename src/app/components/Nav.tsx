import Link from 'next/link'
import React from 'react'

type Props = {}

const Nav = (props: Props) => {
  return (
    <nav className="bg-black/50 backdrop-blur-md fixed w-full z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">AINotion</span>
          <div className="hidden md:flex ml-10 space-x-8">
            <NavLink href="#" text="Features" />
            <NavLink href="#" text="Docs" />
            <NavLink href="#" text="Pricing" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link  href={"/sign-up"} className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Nav

const NavLink: React.FC<{ href: string; text: string }> = ({ href, text }) => (
    <Link href={href} className="text-gray-300 hover:text-white transition">{text}</Link>
  );
  