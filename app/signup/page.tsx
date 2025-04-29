"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Role = "STUDENT" | "EMPLOYER"; // Define role types

type FormValues = {
  fullName: string;
  email: string;
  password?: string;
  role?: Role;
};

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function onSubmit(data: FormValues) {
    setErrorMessage("");
    console.log(JSON.stringify(data));

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      console.log("📥 Raw Response:", text);
     
  

      const parsedData = JSON.parse(text);
      console.log("✅ Parsed JSON:", parsedData);

      if (res.ok) {
        router.push("/update-profile"); // Redirect to Profile Setup
      } else {
        setErrorMessage(parsedData.error || "An error occurred");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select {...register("role", { required: "Role is required" })} className="w-full p-2 border rounded mt-1">
              <option value="">Select Role</option>
              <option value="STUDENT">Student</option>
              <option value="EMPLOYER">Employer</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
}
