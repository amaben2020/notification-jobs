import { NotificationEmail } from "@/components/emails/notification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendNotificationEmail({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailTemplate = NotificationEmail({ name });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Marc from Papermark <marc@papermark.io>",
      to: email as string,
      subject: "You have a new view on your document!",
      react: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
