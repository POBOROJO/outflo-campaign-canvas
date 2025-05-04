// linkedinScraper.ts
import mongoose from "mongoose";
import { ILinkedInProfile } from "../types";
import ProfileModel from "../models/profileModel";
import dotenv from "dotenv";

dotenv.config();

// Scrape Function
async function scrapeLinkedInProfiles(
  searchTerm: string,
  page: number = 1
): Promise<ILinkedInProfile[]> {
  try {
    const cookies = process.env.LINKEDIN_COOKIES!;
    const start = (page - 1) * 10;

    const res = await fetch(
      `https://www.linkedin.com/voyager/api/graphql?variables=(start:${start},origin:SWITCH_SEARCH_VERTICAL,query:(keywords:${encodeURIComponent(
        searchTerm
      )},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:heroEntityKey,value:List(urn%3Ali%3Aautocomplete%3A1052861661)),(key:position,value:List(1)),(key:resultType,value:List(PEOPLE)),(key:searchId,value:List(06c4ced8-68b0-4f81-902e-1e71147a775b))),includeFiltersInResponse:false))&&queryId=voyagerSearchDashClusters.181547298141ca2c72182b748713641b`,
      {
        headers: {
          accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": "ajax:1690738384797705558",
          "sec-ch-ua":
            '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          "sec-fetch-site": "same-origin",
          "x-restli-protocol-version": "2.0.0",
          cookie: cookies,
        },
        method: "GET",
      }
    );

    const json = await res.json();
    if (json?.status === 429) throw new Error("Rate limit exceeded");

    const profiles = jsonifyLinkedinSearchResults(json);
    return profiles;
  } catch (error) {
    console.error("Scraping failed:", error);
    return [];
  }
}

// Transform Results
function jsonifyLinkedinSearchResults(json: any): ILinkedInProfile[] {
  const peoplesProfiles = json?.included?.filter(
    (s: any) => s?.template === "UNIVERSAL"
  );
  return (
    peoplesProfiles
      ?.map((p: any) => {
        const urn = p?.trackingUrn?.split(":")?.[3];
        if (urn === "headless") return null;

        return {
          id: urn,
          name: p?.title?.text || "",
          handle: getHandle(p?.navigationUrl),
          jobTitle: p?.primarySubtitle?.text || "",
          company: getCompanyName(p) || "",
          location: p?.secondarySubtitle?.text || "",
          profileUrl: getLinkedinProfileUrl(p?.navigationUrl) || "",
          summary: p?.summary?.text || "",
          imageUrl:
            p?.image?.attributes?.[0]?.detailData?.nonEntityProfilePicture
              ?.vectorImage?.artifacts?.[0]?.fileIdentifyingUrlPathSegment ||
            "",
        };
      })
      .filter(Boolean) || []
  );
}

// Helper Functions
function getHandle(linkedinProfileUrl: string): string {
  const url = getLinkedinProfileUrl(linkedinProfileUrl);
  return url?.split("/in/")?.[1] || "";
}

function getLinkedinProfileUrl(navigationUrl: string): string {
  return navigationUrl?.split("?")?.[0] || "";
}

function getCompanyName(profile: any): string {
  const summaryCompanyName = profile?.summary?.text?.split(" at ")?.[1];
  const profileCompanyName = profile?.primarySubtitle?.text?.split(" at ")?.[1];
  return summaryCompanyName || profileCompanyName || "";
}

// Save to MongoDB
async function saveProfiles(profiles: ILinkedInProfile[]) {
  await mongoose.connect(process.env.MONGO_URI!);
  for (const profile of profiles) {
    try {
      await ProfileModel.findOneAndUpdate(
        { id: profile.id },
        { $setOnInsert: profile },
        { upsert: true }
      );
    } catch (error: any) {
      if (error.code !== 11000)
        console.error("Error saving profile:", error.message);
    }
  }
  console.log(`Saved ${profiles.length} profiles`);
}

// Main Execution
const searchTerm = "lead generation agency";
const page = 1;

scrapeLinkedInProfiles(searchTerm, page)
  .then(saveProfiles)
  .catch((err) => console.error(err));
