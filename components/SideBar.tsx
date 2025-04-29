import { UserProps } from '@/types/global'
import React from 'react'

const SideBar = ({ user }: {user: UserProps}) => {
  return (
    <aside className="bg-gray-800 text-white w-full md:w-64 p-4 space-y-6">
    <div className="text-center text-2xl font-bold">Dashboard</div>
    <nav>
      <ul className="space-y-4">
        <li><a href="#" className="hover:text-gray-300">Home</a></li>
        <li><a href="#" className="hover:text-gray-300">Profile</a></li>
        <li><a href="#" className="hover:text-gray-300">Messages</a></li>
        <li><a href="#" className="hover:text-gray-300">Settings</a></li>
        {user.role === 'STUDENT' && (
          <>
            <li><a href="#" className="hover:text-gray-300">Job Opportunities</a></li>
            <li><a href="#" className="hover:text-gray-300">Applications</a></li>
          </>
        )}
        {user.role === 'EMPLOYER' && (
          <>
            <li><a href="#" className="hover:text-gray-300">Posted Jobs</a></li>
            <li><a href="#" className="hover:text-gray-300">Manage Applicants</a></li>
          </>
        )}
      </ul>
    </nav>
  </aside>
  )
}

export default SideBar