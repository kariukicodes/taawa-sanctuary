import { Resend } from "resend";

export function getResend() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY is missing at runtime");
    return null;
  }

  return new Resend(resendApiKey);
}