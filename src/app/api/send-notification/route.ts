import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email/resend-notification";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, name } = await req.json();
    // send email to document owner that document
    await sendEmail({
      email: email,
      name: name,
    });

    return NextResponse.json(
      { message: "Successfully sent notification" },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Failed sending notification" },
      {
        status: 401,
      },
    );
  }
}
