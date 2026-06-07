import { NextResponse } from "next/server";

const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, time } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required form fields." },
        { status: 400 }
      );
    }

    const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const user_id = process.env.EMAILJS_PUBLIC_KEY;
    const accessToken = process.env.EMAILJS_PRIVATE_KEY;

    if (!service_id || !template_id || !user_id || !accessToken) {
      return NextResponse.json(
        { error: "EmailJS configuration is incomplete." },
        { status: 500 }
      );
    }

    const response = await fetch(EMAILJS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id,
        template_id,
        user_id,
        accessToken,
        template_params: {
          name,
          email,
          subject,
          message,
          time,
        },
      }),
    });

    const text = await response.text();
    let data: any = text;
    try {
      data = JSON.parse(text);
    } catch {
      // leave text as-is when response is not JSON
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (typeof data === "object" && data?.error) ||
            (typeof data === "string" && data) ||
            "Failed to send email.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : JSON.stringify(error);

    return NextResponse.json(
      { error: message || "An unexpected error occurred while sending the message." },
      { status: 500 }
    );
  }
}
