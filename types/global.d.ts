export interface UserProps {
    _id: string; // Ensure a string type for _id
    role: "STUDENT" | "EMPLOYER";
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    profileImage?: string;
  
    // 🔹 Profile Completion Tracking
    profileDone: boolean;
    profileSkipped: boolean;
  
    // 🔹 Student-specific fields
    institution?: string;
    fieldOfStudy?: string;
    skills?: string[];
    availableHours?: number;
    canPostJobs?: boolean;
    resume?: string;
    portfolio?: string;
    preferredJobType?: string;
    preferredLocation?: string;
    expectedSalary?: string;
    workAvailability?: string;
  
    // 🔹 Employer-specific fields
    companyName?: string;
    companyLogo?: string;
    companyWebsite?: string;
    industry?: string;
    companySize?: string;
    companyLocation?: string;
    jobTitle?: string;
    linkedinProfile?: string;
    jobTypesOffered?: string;
    requiredSkills?: string;
    preferredEducation?: string;
    salaryRange?: string;
    workMode?: string;
    companyDescription?: string;
    companyPerks?: string;
    businessRegNumber?: string;
    socialMediaLinks?: string;
    verificationDocs?: string;
  

    recruiterTitle?: string;
    linkedInProfile?: string;
    companyOverview?: string;
    whyStudentsWorkHere?: string;
    pastStudentSuccess?: string;
    isTwoFactorEnabled?: boolean;
    notificationPrefs?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number; // Fix typo (_v should be __v)
  }
  

  
export interface StudentProfileProps {
  user: {
    _id: string;
    role: "STUDENT" | "EMPLOYER";
    fullName?: string;
    profileDone?: boolean;
    phone?: string;
    institution?: string;
    fieldOfStudy?: string;
    skills?: string[];
    availableHours?: number;
    canPostJobs?: boolean;
    resume?: string;
    portfolio?: string;
    preferredJobType?: string;
    preferredLocation?: string;
    expectedSalary?: string;
    workAvailability?: string;
  };
}

export 
interface EmployerProfileProps {
  user: {
    _id: string;
    role: "EMPLOYER";
    fullName?: string;
    profileDone?: boolean;
    phone?: string;
    companyName?: string;
    companyLogo?: string;
    companyWebsite?: string;
    industry?: string;
    companySize?: string;
    companyLocation?: string;
    recruiterTitle?: string;
    linkedInProfile?: string;
    jobTypesOffered?: string;
    requiredSkills?: string;
    preferredEducation?: string;
    salaryRange?: string;
    workMode?: string;
    companyOverview?: string;
    whyStudentsWorkHere?: string;
    pastStudentSuccess?: string;
    businessRegNumber?: string;
    socialMediaLinks?: string;
    verificationDocs?: string;
    isTwoFactorEnabled?: boolean;
    notificationPrefs?: string;
  };
}
