import { CodeInline, Text } from "@react-email/components";

import { EmailLayout } from "./common/EmailLayout";

interface NoMoreSessionsRemainingEmailProps {
  firstName: string;
}

export default function NoMoreSessionsRemainingEmail({
  firstName,
}: NoMoreSessionsRemainingEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>

      <Text>
        We wanted to let you know that you have no more prepaid sessions
        remaining. As a result, your account has been switched to a casual
        account, and you will now need to pay for each session individually from
        now on for $8 per session. Casuals are also limited to 1 session per
        week.
      </Text>

      <Text>
        If you would like to rejoin us as a member, you can purchase the 6
        session package by emailing{" "}
        <CodeInline>badminton.au@gmail.com</CodeInline>.
      </Text>

      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}

NoMoreSessionsRemainingEmail.PreviewProps = {
  firstName: "John",
};
