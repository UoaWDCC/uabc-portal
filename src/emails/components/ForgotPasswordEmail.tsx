import { Link, Text } from "@react-email/components";

import { env } from "@/env";
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
        Thanks for requesting a password reset. To create a new password, please
        click the link below:
      </Text>

      <Link href={`${env.APP_URL}/reset-password?token=${token}`}>
        Reset Password
      </Link>

      <Text>
        If you didn&apos;t make this request, you can ignore this email and
        carry on as usual.
      </Text>

      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}
