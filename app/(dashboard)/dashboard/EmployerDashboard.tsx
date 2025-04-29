import { UserProps } from '@/types/global'
import React from 'react'

const EmployerDashboard = ({ user }: {user: UserProps })=> {
  return (
    <>
    <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
    {/* Map over posted jobs */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="font-semibold text-lg">Graphic Designer</h3>
        <p className="text-gray-600">Company ABC</p>
        <div className="flex justify-between mt-4">
          <span>5 Applicants</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            View Applicants
          </button>
        </div>
      </div>
      {/* Add more posted job listings dynamically */}
    </div>
  </>
  )
}

export default EmployerDashboard