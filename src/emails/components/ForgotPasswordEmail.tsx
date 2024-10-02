import { Link, Text } from "@react-email/components";

import { EmailLayout } from "./common/EmailLayout";

import { env } from "@/env";

interface ForgotPasswordEmailProps {
  firstName: string;
  token: string;
}

export default function ForgotPasswordEmail({
  firstName,
  token,
}: ForgotPasswordEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>

      <Text>
        As you have requested for reset password instructions, here they are,
        please follow the URL:
      </Text>

      <Link
        href={`${env.APP_URL}/reset-password?resetPasswordToken=${token}`}
      >
        Reset Password
      </Link>

      <Text>Alternatively, open the following url in your browser</Text>

      <Text>
        <pre>{env.APP_URL}/reset-password?resetPasswordToken={token}</pre>
      </Text>
    </EmailLayout>
  );
}
