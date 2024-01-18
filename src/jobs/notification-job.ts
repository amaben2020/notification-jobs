import { client } from "@/trigger";
import { eventTrigger, retry } from "@trigger.dev/sdk";
import { z } from "zod";

client.defineJob({
  id: "send-notification",
  name: "Send Notification",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "link.viewed",
    schema: z.object({
      viewId: z.string(),
    }),
  }),
  run: async (payload, io, ctx) => {
    const { viewId } = payload;

    // get file url from document version
    await io.runTask(
      "send-notification",
      async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/send-notification`,
          {
            method: "POST",
            body: JSON.stringify({ viewId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`, // <- add the authenication header with a local env variable
            },
          },
        );

        if (!response.ok) {
          await io.logger.error("Failed to send notification", { payload });
          return;
        }

        const { message } = (await response.json()) as {
          message: string;
        };

        await io.logger.info("Notification sent", { message, payload });
        return { message };
      },
      { retry: retry.standardBackoff },
    );

    return {
      success: true,
      message: "Successfully sent notification",
    };
  },
});
