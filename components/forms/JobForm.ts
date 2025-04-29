"use client";
import { useState } from "react";
import axios from "axios";

const StudentProfileForm = ({ user }:{ user:any}) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    phone: user.phone || "",
    institution: user.institution || "",
    fieldOfStudy: user.fieldOfStudy || "",
    skills: user.skills || "",
    availableHours: user.availableHours || "",
    canPostJobs: user.canPostJobs || false,
    resume: user.resume || "",
    portfolio: user.portfolio || "",
    preferredJobType: user.preferredJobType || "",
    preferredLocation: user.preferredLocation || "",
    expectedSalary: user.expectedSalary || "",
    workAvailability: user.workAvailability || "",
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/profile/update", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Student Profile</h2>

      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="input-field" />

      <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" required className="input-field" />

      <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} placeholder="Field of Study" required className="input-field" />

      <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="input-field" />

      <input type="number" name="availableHours" value={formData.availableHours} onChange={handleChange} placeholder="Available Hours per Week" className="input-field" />

      <input type="text" name="resume" value={formData.resume} onChange={handleChange} placeholder="Resume URL" className="input-field" />

      <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Portfolio Website" className="input-field" />

      <input type="text" name="preferredJobType" value={formData.preferredJobType} onChange={handleChange} placeholder="Preferred Job Type (Full-time, Internship, etc.)" className="input-field" />

      <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="Preferred Location" className="input-field" />

      <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="Expected Salary Range" className="input-field" />

      <label className="flex items-center space-x-2">
        <input type="checkbox" name="canPostJobs" checked={formData.canPostJobs} onChange={handleChange} />
        <span>Allow me to post jobs</span>
      </label>

      <button type="submit" className="btn-primary">Save Profile</button>
    </form>
  );
};

export default StudentProfileForm;
