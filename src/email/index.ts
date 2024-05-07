import { SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import { env } from "@/env";
import { Email } from "./templates/Email";

const SES_CONFIG = {
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
};
const ses = new SES(SES_CONFIG);

export const sendEmail = async (
  templateName: string,
  recipientEmail: string,
) => {
  const emailHtml = render(Email({ url: templateName }));

  const params = {
    Source: "Kimiavarasteh@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "hello world",
      },
    },
  };

  try {
    const res = await ses.sendEmail(params);
    console.log("Email has been sent", res); // Log the response for debugging purposes
  } catch (error) {
    console.error("Error sending email!:", error);
  }
};
