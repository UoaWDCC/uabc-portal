import { CodeInline, Text } from "@react-email/components";

import EmailLayout from "./EmailLayout";

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
        We wanted to let you know that you have{" "}
        <strong>no more prepaid sessions remaining</strong>. As a result, your
        account has been switched to a casual account, and you will now need to
        pay for each session individually from now on.
      </Text>

      <Text>As a casual member, you’ll need to pay $8 for each session.</Text>

      <Text>
        If you would like to top up on prepaid sessions, please email{" "}
        <CodeInline>badminton.au@gmail.com</CodeInline> to purchase the 6
        session package.
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
