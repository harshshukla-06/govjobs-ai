"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import UserForm from "@/components/UserForm";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("USER:", user);

      if (!user) {
        router.replace("/auth");
      } else {
        setUserExists(true);
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  // While checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Checking Authentication...
      </div>
    );
  }

  // If no user, don't render page
  if (!userExists) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center p-8">
         <UserForm />
      </main>
    </>
  );
}