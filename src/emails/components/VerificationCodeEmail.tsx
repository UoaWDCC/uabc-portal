import { Text } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface VerificationCodeEmailProps {
  code: string;
}

export default function VerificationCodeEmail({
  code,
}: VerificationCodeEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi there,</Text>

      <Text>Your verification code for the UABC booking portal is:</Text>

      <Text className="text-xl font-semibold">{code}</Text>

      <Text>
        If you did not initiate this request, please ignore this email.
      </Text>

      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}

VerificationCodeEmail.PreviewProps = {
  code: "123456",
};
