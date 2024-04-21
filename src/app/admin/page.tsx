import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

export default function SelectAdminPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex p-4">
        <Heading>Admin Dashboard</Heading>
      </div>

      <div className="mt-6 mb-8 mx-4 flex justify-center">
        <Button large className="w-full">
          Edit Schedule
        </Button>
      </div>
      <div className="mt-6 mb-8 mx-4 flex justify-center">
        <Button large className="w-full">
          View Sessions
        </Button>
      </div>
    </div>
  );
}
