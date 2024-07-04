import type { Message } from "@aws-sdk/client-ses";
import { SendEmailCommand, SES } from "@aws-sdk/client-ses";

import { env } from "@/env";

const SES_CONFIG = {
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
};

export const client = new SES(SES_CONFIG);

export const createSendEmailCommand = ({
  toAddress,
  template,
}: {
  toAddress: string;
  template: Message;
}) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: template,
    Source: env.SENDER_EMAIL_ADDRESS,
  });
};
