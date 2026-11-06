export interface SendEmailOptions {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[EMAIL MOCK / NO RESEND_API_KEY] Email queued successfully:", {
      to: options.to,
      subject: options.subject,
      from: options.from,
    });
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: options.from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        reply_to: options.replyTo,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[RESEND API ERROR]", errorData);
      return { success: false, error: JSON.stringify(errorData) };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error("[EMAIL SEND EXCEPTION]", err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}

