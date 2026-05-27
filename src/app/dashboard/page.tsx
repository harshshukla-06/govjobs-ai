"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  LayoutDashboard,
  Bookmark,
  Search,
  LogOut,
  UserCircle,
  BriefcaseBusiness,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
    } else {
      setUser(user);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/auth");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        
        <div>
          <div className="flex items-center gap-2 mb-10">
            <BriefcaseBusiness className="text-blue-600" />

            <h1 className="text-2xl font-bold text-blue-600">
              GovJobsAI
            </h1>
          </div>

          <div className="space-y-3">
            
            <button className="w-full flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-2xl">
              <LayoutDashboard size={20} />
              Dashboard
            </button>

            <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition"
            >
            <Search size={20} />
            Find Jobs
            </button>

            <button
              onClick={() =>
                router.push("/saved-jobs")
              }
              className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition"
            >
              <Bookmark size={20} />
              Saved Jobs
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-2xl transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-10">

        {/* TOP */}
        <div className="flex justify-between items-center mb-10">
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back to your AI job portal
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
            <UserCircle className="text-blue-600" />

            <span className="font-medium">
              {user?.email}
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-gray-500">
              Total Recommendations
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              24
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-gray-500">
              Saved Jobs
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
              8
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-gray-500">
              Applied Jobs
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-4">
              3
            </p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          
          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">
                  Railway JE
                </h3>

                <p className="text-gray-500 text-sm">
                  Saved recently
                </p>
              </div>

              <span className="text-sm text-gray-400">
                2 mins ago
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">
                  SBI Clerk
                </h3>

                <p className="text-gray-500 text-sm">
                  Recommended for you
                </p>
              </div>

              <span className="text-sm text-gray-400">
                1 hour ago
              </span>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}