import { UserProps } from '@/types/global'
import React from 'react'

const StudentDashboard = ({ user }: {user: UserProps })=> {
  return (
      <>
    <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
    {/* Map over job opportunities */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Sample Job Cards */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="font-semibold text-lg">Software Developer</h3>
        <p className="text-gray-600">Company XYZ</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Apply Now
        </button>
      </div>
      {/* Add more job listings dynamically */}
    </div>
  </>
  )
}

export default StudentDashboard