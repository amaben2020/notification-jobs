// pages/api/send-notification.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sendViewedDocumentEmail } from "@/lib/emails/resend-notification";

export const config = {
  maxDuration: 60,
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // We only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  // POST /api/send-notification
  try {
    const { viewId } = req.body as {
      viewId: string;
    };

    // Fetch the link to verify the settings
    const view = await prisma.view.findUnique({
      where: {
        id: viewId,
      },
      select: {
        document: {
          select: {
            owner: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!view) {
      res.status(404).json({ message: "View / Document not found." });
      return;
    }

    // send email to document owner that document
    await sendViewedDocumentEmail({
      email: view.document.owner.email as string,
      name: view.document.owner.name as string,
    });

    res.status(200).json({ message: "Successfully sent notification", viewId });
    return;
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: (error as Error).message });
  }
}
