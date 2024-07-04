import { NextResponse } from "next/server";

import { client, createSendEmailCommand } from "@/email";
import { BasicEmailTemplate } from "@/email/templates/BasicEmailTemplate";

export async function GET() {
  const sendEmailCommand = createSendEmailCommand({
    toAddress: "user@test.com",
    template: BasicEmailTemplate,
  });

  try {
    const data = await client.send(sendEmailCommand);
    return NextResponse.json(data);
  } catch (caught) {
    return NextResponse.json(caught, { status: 400 });
  }
}
