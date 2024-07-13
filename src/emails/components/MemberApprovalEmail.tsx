import { Text } from "@react-email/components";

import { EmailLayout } from "./common/EmailLayout";

interface MemberApprovalEmailProps {
  firstName: string;
  prepaidSessionCount: number;
}

export default function MemberApprovalEmail({
  firstName,
  prepaidSessionCount,
}: MemberApprovalEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>

      <Text>
        We are excited to inform you that your account has been successfully
        verified! 🎉 We have topped up your account with {prepaidSessionCount}{" "}
        prepaid sessions.
      </Text>

      <Text>We hope to see you on the courts soon! &#127992;</Text>

      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}

MemberApprovalEmail.PreviewProps = {
  firstName: "John",
  prepaidSessionCount: 22,
};
