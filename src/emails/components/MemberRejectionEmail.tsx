import { CodeInline, Text } from "@react-email/components";

import { EmailLayout } from "./common/EmailLayout";

interface MemberRejectionEmailProps {
  firstName: string;
}

export default function MemberRejectionEmail({
  firstName,
}: MemberRejectionEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>
      <Text>
        We regret to inform you that your membership application has been
        rejected as we couldn&apos;t find you in our member records. However,
        you can still book sessions as a casual player for $8 per session.
      </Text>
      <Text>
        If you would like to become a member with us, you can purchase the 6
        session package by emailing{" "}
        <CodeInline>badminton.au@gmail.com</CodeInline>.
      </Text>
      <Text>
        If you believe this decision was made in error or have any questions,
        please reply to this email.
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

MemberRejectionEmail.PreviewProps = {
  firstName: "John",
};
