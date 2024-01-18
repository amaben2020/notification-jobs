import { Redis } from "@upstash/redis";

// Connect to an Upstash Redis instance
const redis = Redis.fromEnv();

// Publish a message to the Upstash Redis instance
//@ts-ignore
await redis.publish(
  "posts",
  JSON.stringify({
    date: new Date().toString(),
    message: "I am a new message.",
  }),
);
