import { LogOutButton } from "@/components/LogOutButton";

export const metadata = {
  title: "Log Out - UABC Booking Portal",
};

export default function SignOutPage() {
  return (
    <LogOutButton size="default" variant="default">
      Log Out
    </LogOutButton>
  );
}
