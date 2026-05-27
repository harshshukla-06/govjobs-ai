import { scrapeJobs } from "@/services/jobScraper";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const scrapedJobs = await scrapeJobs();

    for (const job of scrapedJobs) {

      // CHECK IF JOB ALREADY EXISTS
      const { data: existingJob } = await supabase
        .from("jobs")
        .select("*")
        .eq("title", job.title)
        .single();

      // IF JOB EXISTS -> SKIP
      if (existingJob) {
        console.log("JOB ALREADY EXISTS:", job.title);

        continue;
      }

      // INSERT NEW JOB
      const { error } = await supabase
        .from("jobs")
        .insert([
          {
            title: job.title,
            qualification: job.qualification,
            interests: job.interests,
            ageLimit: job.ageLimit,
            state: job.state,
          },
        ]);

      if (error) {
        console.log("INSERT ERROR:", error);
      } else {
        console.log("NEW JOB INSERTED:", job.title);
      }
    }

    return Response.json({
      success: true,
      message: "Scraping completed successfully",
    });

  } catch (error) {
    console.log("API ERROR:", error);

    return Response.json({
      success: false,
      error,
    });
  }
}