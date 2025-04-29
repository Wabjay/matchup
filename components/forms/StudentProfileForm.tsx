"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserProps } from "@/types/global";
import { useRouter } from "next/navigation";


const StudentProfileForm = ({ user }: { user : UserProps} ) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    role: "STUDENT",
    profileDone: true,
    phone: user.phone || "",
    institution: user.institution || "",
    fieldOfStudy: user.fieldOfStudy || "",
    skills: user.skills ? user.skills : [""],
    availableHours: user.availableHours || "",
    canPostJobs: user.canPostJobs || false,
    resume: user.resume || "",
    portfolio: user.portfolio || "",
    preferredJobType: user.preferredJobType || "",
    preferredLocation: user.preferredLocation || "",
    expectedSalary: user.expectedSalary || "",
    workAvailability: user.workAvailability || "",
  });
    const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`api/users/${user._id}`, formData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Student Profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
        </div>

        {/* Institution */}
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input type="text" name="institution" id="institution" value={formData.institution} onChange={handleChange} placeholder="University Name" required />
        </div>

        {/* Field of Study */}
        <div>
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input type="text" name="fieldOfStudy" id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} placeholder="Computer Science" required />
        </div>

        {/* Skills */}
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input type="text" name="skills" id="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Python" />
        </div>

        {/* Available Hours */}
        <div>
          <Label htmlFor="availableHours">Available Hours per Week</Label>
          <Input type="number" name="availableHours" id="availableHours" value={formData.availableHours} onChange={handleChange} placeholder="10" />
        </div>

        {/* Resume */}
        <div>
          <Label htmlFor="resume">Resume URL</Label>
          <Input type="text" name="resume" id="resume" value={formData.resume} onChange={handleChange} placeholder="https://..." />
        </div>

        {/* Portfolio */}
        <div>
          <Label htmlFor="portfolio">Portfolio Website</Label>
          <Input type="text" name="portfolio" id="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://..." />
        </div>

        {/* Preferred Job Type */}
        <div>
          <Label htmlFor="preferredJobType">Preferred Job Type</Label>
          <Input type="text" name="preferredJobType" id="preferredJobType" value={formData.preferredJobType} onChange={handleChange} placeholder="Internship, Part-time, etc." />
        </div>

        {/* Preferred Location */}
        <div>
          <Label htmlFor="preferredLocation">Preferred Location</Label>
          <Input type="text" name="preferredLocation" id="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="Remote, New York, etc." />
        </div>

        {/* Expected Salary */}
        <div>
          <Label htmlFor="expectedSalary">Expected Salary</Label>
          <Input type="text" name="expectedSalary" id="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="$500/month" />
        </div>

        {/* Allow Posting Jobs */}
        <div className="flex items-center space-x-2">
          <Checkbox name="canPostJobs" id="canPostJobs" checked={formData.canPostJobs} onCheckedChange={(checked: any) => setFormData({ ...formData, canPostJobs: !!checked })} />
          <Label htmlFor="canPostJobs">Allow me to post jobs</Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">Save Profile</Button>
      </div>
    </form>
  );
};

export default StudentProfileForm;
















