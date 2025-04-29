"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StudentProfileForm from "./forms/StudentProfileForm";
import EmployerProfileForm from "./forms/EmployerProfileForm";
import { UserProps } from "@/types/global";


const ProfileUpdate = ({ user }: {user: UserProps}) => {
  const [selectedRole, setSelectedRole] = useState(user.role || "");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user.role) {
      setIsModalOpen(false);
    }
    console.log(user.role)
  }, [user.role]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Role Selection Modal */}
      <Dialog open={isModalOpen}>
        <DialogContent>
          <DialogTitle>Select Your Role</DialogTitle>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={() => setSelectedRole("STUDENT")}>
              Student
            </Button>
            <Button onClick={() => setSelectedRole("EMPLOYER")}>
              Employer
            </Button>
          </div>
          {selectedRole && (
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">
              Continue
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Update Form */}
      {selectedRole === "STUDENT" ? (
        <StudentProfileForm user={user} />
      ) : selectedRole === "EMPLOYER" ? (
        <EmployerProfileForm user={user} />
      ) : (
        <p className="text-gray-500">Please select a role to update your profile.</p>
      )}
    </div>
  );
};

export default ProfileUpdate;
