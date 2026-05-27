"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BriefcaseBusiness } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAuth() {
    if (isLogin) {
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error) {
        alert(error.message);
      } else {
        alert("Signup Successful");
      }
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-blue-600 text-white">
        
        <div className="flex items-center gap-3 mb-8">
          <BriefcaseBusiness size={40} />

          <h1 className="text-4xl font-extrabold">
            GovJobsAI
          </h1>
        </div>

        <h2 className="text-6xl font-extrabold leading-tight">
          Your AI-Powered Government Job Assistant
        </h2>

        <p className="mt-8 text-lg text-blue-100 leading-relaxed">
          Discover personalized government job recommendations,
          save opportunities, track applications, and accelerate
          your career journey with AI.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8">
        
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
          
          <h1 className="text-4xl font-bold text-center text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-8">
            {isLogin
              ? "Login to continue your journey"
              : "Start discovering government jobs"}
          </p>

          <div className="grid gap-5">
            
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-2xl"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-2xl"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleAuth}
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl text-lg font-semibold"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-medium"
            >
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}