"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  Bookmark,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function SavedJobsPage() {
  const router = useRouter();

  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    fetchSavedJobs(user.email!);
  }

  async function fetchSavedJobs(email: string) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*")
      .eq("user_email", email);

    if (!error) {
      setSavedJobs(data || []);
    }

    setLoading(false);
  }

  async function removeJob(id: number) {
    await supabase
      .from("saved_jobs")
      .delete()
      .eq("id", id);

    setSavedJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-6xl mx-auto">

        {/* TOP */}
        <div className="flex justify-between items-center mb-10">
          
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900">
              Saved Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your bookmarked opportunities
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl"
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>
        </div>

        {/* EMPTY */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <Bookmark
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Saved Jobs Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Save jobs to access them later.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition"
              >
                
                <div className="flex justify-between items-start">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600">
                      {job.job_title}
                    </h2>

                    <div className="flex gap-2 mt-4">
                      
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.qualification}
                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.interests}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="bg-red-100 hover:bg-red-200 transition p-3 rounded-xl"
                  >
                    <Trash2
                      size={20}
                      className="text-red-500"
                    />
                  </button>
                </div>

                <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl font-semibold">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}