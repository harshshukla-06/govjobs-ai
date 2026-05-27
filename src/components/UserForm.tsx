"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserForm() {
  const [jobs, setJobs] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    state: "",
    interests: "",
  });

  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*");

      if (error) {
        console.log("SUPABASE ERROR:", error);
        return;
      }

      console.log("DATABASE JOBS:", data);

      if (data) {
        setJobs(data);
      }
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("BUTTON CLICKED");

    console.log("FORM DATA:", formData);
    console.log("ALL JOBS:", jobs);
    const filteredJobs = jobs.filter((job) => {
      return (
        job.qualification?.toLowerCase() ===
          formData.qualification.toLowerCase() &&
        job.interests?.toLowerCase() ===
          formData.interests.toLowerCase() &&
        Number(formData.age) <= Number(job.ageLimit)
      );
    });

    console.log("FILTERED JOBS:", filteredJobs);

    setRecommendedJobs(filteredJobs);
  };

  async function saveJob(job: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase
    .from("saved_jobs")
    .insert([
      {
        user_email: user.email,
        job_title: job.title,
        qualification: job.qualification,
        interests: job.interests,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Error saving job");
  } else {
    alert("Job Saved Successfully");
  }
}

  return (
  <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
    
    {/* LEFT SIDE */}
    <div>
      <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
        Discover Your
        <span className="text-blue-600"> Dream Government Job</span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 leading-relaxed">
        AI-powered platform that helps students and aspirants
        discover the best government jobs based on their
        qualification, interests, and eligibility.
      </p>

      <div className="mt-8 flex gap-4">
        <div className="bg-white shadow-md px-6 py-4 rounded-2xl">
          <h2 className="text-3xl font-bold text-blue-600">
            10K+
          </h2>

          <p className="text-gray-500">
            Jobs Listed
          </p>
        </div>

        <div className="bg-white shadow-md px-6 py-4 rounded-2xl">
          <h2 className="text-3xl font-bold text-blue-600">
            5K+
          </h2>

          <p className="text-gray-500">
            Active Users
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl p-8 rounded-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Government Jobs
      </h2>

      <div className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-xl"
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-xl"
          onChange={handleChange}
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-xl"
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-xl"
          onChange={handleChange}
        />

        <input
          type="text"
          name="interests"
          placeholder="Interests"
          className="border border-gray-300 focus:border-blue-500 outline-none p-4 rounded-xl"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl text-lg font-semibold"
        >
          Get Recommendations
        </button>
      </div>

      {recommendedJobs.length > 0 && (
  <div className="mt-10">
    
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-3xl font-bold text-gray-900">
        Recommended Jobs
      </h3>

      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
        {recommendedJobs.length} Jobs Found
      </span>
    </div>

    <div className="grid gap-5">
      
      {recommendedJobs.map((job) => (
        <div
          key={job.id}
          className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
        >
          
          <div className="flex justify-between items-start">
            
            <div>
              <h4 className="text-2xl font-bold text-blue-600">
                {job.title}
              </h4>

              <div className="flex gap-2 mt-4 flex-wrap">
                
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.qualification}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.interests}
                </span>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Age Limit: {job.ageLimit}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            
            <button
              onClick={() => saveJob(job)}
              className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-2xl font-semibold"
            >
              Save Job
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl font-semibold">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  </div>
);
}