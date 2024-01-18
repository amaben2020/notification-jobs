import { NotificationEmail } from "@/components/emails/notification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!!);

export async function sendEmail({
  name,
  email,
}: {
  name: string;
  email: string | null | undefined;
}) {
  const emailTemplate = NotificationEmail({ name });
  try {
    // Send the email using the Resend API

    await resend.emails.send({
      // you must use a verified domain i.e https://resend.com/domains
      from: "onboarding@resend.dev",
      to: email as string,
      subject: "You have a new view on your document!",
      react: emailTemplate,
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
