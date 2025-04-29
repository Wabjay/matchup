"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserProps } from "@/types/global";
import { useRouter } from "next/navigation";

const EmployerProfileForm = ({ user }: { user : UserProps}) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    role: "EMPLOYER",
    profileDone: true,
    phone: user.phone || "",
    companyName: user.companyName || "",
    companyLogo: user.companyLogo || "",
    companyWebsite: user.companyWebsite || "",
    industry: user.industry || "",
    companySize: user.companySize || "",
    companyLocation: user.companyLocation || "",
    recruiterTitle: user.recruiterTitle || "",
    linkedInProfile: user.linkedInProfile || "",
    jobTypesOffered: user.jobTypesOffered || "",
    requiredSkills: user.requiredSkills || "",
    preferredEducation: user.preferredEducation || "",
    salaryRange: user.salaryRange || "",
    workMode: user.workMode || "",
    companyOverview: user.companyOverview || "",
    whyStudentsWorkHere: user.whyStudentsWorkHere || "",
    pastStudentSuccess: user.pastStudentSuccess || "",
    businessRegNumber: user.businessRegNumber || "",
    socialMediaLinks: user.socialMediaLinks || "",
    verificationDocs: user.verificationDocs || "",
    isTwoFactorEnabled: user.isTwoFactorEnabled || false,
    notificationPrefs: user.notificationPrefs || "",
  });
    const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`api/users/${user._id}`, formData);
      alert(response.data.message);

      router.push("/dashboard/employer");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Employer Profile</h2>

      <div className="grid gap-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} placeholder="Tech Corp"  />
        </div>

        {/* Company Logo */}
        <div>
          <Label htmlFor="companyLogo">Company Logo URL</Label>
          <Input type="text" name="companyLogo" id="companyLogo" value={formData.companyLogo} onChange={handleChange} placeholder="https://..." />
        </div>

        {/* Company Website */}
        <div>
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input type="text" name="companyWebsite" id="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://..." />
        </div>

        {/* Industry */}
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input type="text" name="industry" id="industry" value={formData.industry} onChange={handleChange} placeholder="Technology, Finance, etc." />
        </div>

        {/* Company Size */}
        <div>
          <Label htmlFor="companySize">Company Size</Label>
          <Input type="text" name="companySize" id="companySize" value={formData.companySize} onChange={handleChange} placeholder="50-200 employees" />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="companyLocation">Location</Label>
          <Input type="text" name="companyLocation" id="companyLocation" value={formData.companyLocation} onChange={handleChange} placeholder="New York, USA" />
        </div>

        {/* Job Types Offered */}
        <div>
          <Label htmlFor="jobTypesOffered">Job Types Offered</Label>
          <Input type="text" name="jobTypesOffered" id="jobTypesOffered" value={formData.jobTypesOffered} onChange={handleChange} placeholder="Internship, Part-time, etc." />
        </div>

        {/* Required Skills */}
        <div>
          <Label htmlFor="requiredSkills">Required Skills</Label>
          <Input type="text" name="requiredSkills" id="requiredSkills" value={formData.requiredSkills} onChange={handleChange} placeholder="React, Node.js, Python" />
        </div>

        {/* Company Overview */}
        <div>
          <Label htmlFor="companyOverview">Company Overview</Label>
          <Textarea name="companyOverview" id="companyOverview" value={formData.companyOverview} onChange={handleChange} placeholder="Brief description about the company" />
        </div>

        {/* Enable Two-Factor Authentication */}
        <div className="flex items-center space-x-2">
          <Checkbox name="isTwoFactorEnabled" id="isTwoFactorEnabled" checked={formData.isTwoFactorEnabled} onCheckedChange={(checked: any) => setFormData({ ...formData, isTwoFactorEnabled: !!checked })} />
          <Label htmlFor="isTwoFactorEnabled">Enable Two-Factor Authentication</Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">Save Profile</Button>
      </div>
    </form>
  );
};

export default EmployerProfileForm;
