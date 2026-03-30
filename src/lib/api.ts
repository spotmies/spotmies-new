import { Project, Job } from "@/types/types";
import { PROJECT_DATA } from "@/data/projects"; // Import the local data

const CAREERS_API_URL = "https://api.reaidy.io/api/v1/public/jobs";

// CHANGED: Now simply returns local data immediately
export async function getProjects(): Promise<Project[]> {
    return PROJECT_DATA;
}

// Keep the Jobs API as is (it's fast enough and external)
export async function getJobs(page: number = 1, limit: number = 6): Promise<{ jobs: Job[], total: number }> {
    try {
        const skip = (page - 1) * limit;
        const res = await fetch(`${CAREERS_API_URL}?skip=${skip}&limit=${limit}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recruiterId: ["67d1aba6681a45400442f68c", "658bd65337b2a440f7f467df"]
            }),
            next: { revalidate: 60 }
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const responseData = await res.json();

        return {
            jobs: responseData.data || [],
            total: responseData.count || 0
        };
    } catch (error) {
        console.error("Careers API Error:", error);
        return { jobs: [], total: 0 };
    }
}