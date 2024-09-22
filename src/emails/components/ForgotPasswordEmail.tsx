import { Link, Text } from "@react-email/components";

import { EmailLayout } from "./common/EmailLayout";

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
        href={`https://uabc.wdcc.co.nz/reset-password?resetPasswordToken=${token}`}
      >
        Reset Password
      </Link>

      <Text>Alternatively, open the following url in your browser</Text>

      <Text>
        <pre>localhost:3000/reset-password?resetPasswordToken={token}</pre>
      </Text>
    </EmailLayout>
  );
}
