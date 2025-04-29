"use client"
import { UserProps } from '@/types/global';
import React, { ReactNode, useState } from 'react';
import { signOut } from "next-auth/react";

const MainMenu = async ({ user, page, children }: {user: UserProps, page: string, children: ReactNode }) => {

  // State to manage sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    await signOut({ redirect: false }); // Sign out from NextAuth.js
    window.location.href = "/login"; // Redirect to the homepage or login page
  };

  console.log(page)


  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-full md:w-64 p-4 space-y-6 transition-all duration-500 ease-in-out transform ${
            isSidebarOpen
              ? 'h-fit translate-x-0'
              : 'h-0 -translate-x-full md:translate-x-0'
          } fixed top-0 left-0 overflow-y-auto md:relative md:h-auto md:block`}
      >

        {/* Close Button inside the Sidebar */}
        <button
          className="absolute top-4 right-4 text-white text-3xl md:hidden"
          onClick={toggleSidebar}
        >
          ✖
        </button>
        <div className=" text-2xl font-bold">Dashboard</div>
        <nav>
          <ul className="space-y-4">
            <li><a href="/dashboard" className="hover:text-gray-300">Home</a></li>
            <li><a href="profile" className="hover:text-gray-300">Profile</a></li>
            <li><a href="chat" className="hover:text-gray-300">Messages</a></li>
            <li><a href="settings" className="hover:text-gray-300">Settings</a></li>
            {user.role === 'STUDENT' && (
              <>
                <li><a href="job-list" className="hover:text-gray-300">Job Opportunities</a></li>
                <li><a href="history" className="hover:text-gray-300">Applications</a></li>
              </>
            )}
            {user.role === 'EMPLOYER' && (
              <>
                <li><a href="post-job" className="hover:text-gray-300">Posted Jobs</a></li>
                <li><a href="applications" className="hover:text-gray-300">Manage Applicants</a></li>
              </>
            )}
          </ul>
        </nav>
         {/* Logout Button */}
         <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          {/* Hamburger Menu for Mobile */}
        

          <h1 className="text-3xl font-semibold">
            {user.role === 'STUDENT' ? `Student ${page}` : `Employer ${page}`}
          </h1>
          <button
            className="md:hidden text-3xl"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '✖' : '☰'}
          </button>
        </div>

        <section className="mb-6 p-4 bg-white shadow-md rounded-lg">
          {/* <h2 className="text-2xl font-semibold mb-4">Profile Information</h2> */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col">
              <span className="font-bold">Name:</span>
              <span>{user?.fullName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Role:</span>
              <span>{user.role}</span>
            </div>
          </div>
        </section>
{children}
     
      </main>
    </div>
  );
};

export default MainMenu;
