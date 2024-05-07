import { sendEmail } from "@/email/index";

export async function GET() {
  await sendEmail("www.hello.com", "Kimiavarasteh@gmail.com");
  return new Response(null, { status: 204 });
}
