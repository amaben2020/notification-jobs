// Use ioredis to be able to subscribe to an Upstash Redis instance
import Redis from "ioredis";

// Create an Upstash Redis Subscriber instance
const redisSubscriber = new Redis(process.env.UPSTASH_REDIS_URL!!);

// Define the key to listen and publish messages to
const setKey = "posts";

// Subscribe to Redis updates for the key: "posts"
// In case of any error, just log it
redisSubscriber.subscribe(setKey, (err) => {
  if (err) console.log(err);
});

// Listen for new posts from Redis
redisSubscriber.on("message", (channel, message) => {
  // Log the data when the channel message is received is same as the message is published to
  if (channel === setKey) console.log(message);
});
