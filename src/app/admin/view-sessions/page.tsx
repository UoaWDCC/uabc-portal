import { Suspense } from "react";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import ClientViewSessionsPage from "./client-page";

export const metadata = {
  title: "View Sessions - UABC Booking Portal",
};

export default function ViewSessionsPage() {
  return (
    <div className="mx-4 mt-0 flex min-h-dvh flex-col">
      <BackNavigationBar
        title="View Sessions"
        pathName="/admin"
      ></BackNavigationBar>
      <Suspense>
        <ClientViewSessionsPage />
      </Suspense>
    </div>
  );
}
