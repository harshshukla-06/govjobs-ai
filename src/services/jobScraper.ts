import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeJobs() {
  try {
    // Sample website for learning
    const url = "https://example.com";

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const jobs: any[] = [];

    $("h1").each((index, element) => {
      jobs.push({
        title: $(element).text(),
        qualification: "Graduation",
        interests: "Administration",
        ageLimit: 30,
        state: "All India",
      });
    });

    return jobs;
  } catch (error) {
    console.log("SCRAPER ERROR:", error);

    return [];
  }
}