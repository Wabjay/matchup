"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema using zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema), // Add zod resolver for validation
  });

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.profileDone) {
        router.push("/");
      } else {
        router.push("/update-profile");
      }
    }
  }, [session, status, router]);

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Prevent NextAuth from automatically redirecting
      });

      if (res?.error) {
        console.log(res?.error)
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
<p className="text-sm text-right mt-2">
  <a href="/forgot-password" className="text-blue-500 hover:underline">
    Forgot Password?
  </a>
</p>
        <div className="relative mt-6 text-center">
          <span className="bg-white px-2 text-gray-500 text-sm">OR</span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 bg-white border p-2 mt-4 rounded shadow-sm hover:shadow-md transition-all"
        >
          <FcGoogle className="text-xl" />
          <span>Sign in with Google</span>
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
