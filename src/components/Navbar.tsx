"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  Search,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/auth");
  }

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <BriefcaseBusiness className="text-blue-600" />

        <h1 className="text-2xl font-extrabold text-blue-600">
          GovJobsAI
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            {/* FIND JOBS */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-xl"
            >
              <Search size={18} />
              Find Jobs
            </button>

            {/* DASHBOARD */}
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            {/* USER EMAIL */}
            <div className="hidden md:flex bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium">
              {user.email}
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl font-medium"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}