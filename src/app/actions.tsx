// File: app/actions.jsx

"use server";

import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

// The function that takes care of obtaining the country code from Vercel headers
// And publishing messages to the Upstash Redis database with the current timestamp
export async function publishNotification(formData: FormData) {
  "use server";
  const redis = Redis.fromEnv();

  // Extract the message in the form submitted
  const message = formData.get("message");

  // Obtain country of the user using Vercel's x-vercel-ip-country header
  const headersList = headers();
  const country = headersList.get("x-vercel-ip-country");

  // Publish the message to the "posts" channel in Upstash Redis
  await redis.publish(
    "posts",
    JSON.stringify({
      message,
      country,
      date: new Date().toString(),
    }),
  );
}
