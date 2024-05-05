import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

const buttonStyle = {
  height: "80px",
  margin: "16px",
};

const arrowStyle = {
  marginLeft: "auto",
  width: "32px",
  height: "32px",
};

export default function SelectAdminPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex p-4">
        <Heading>Dashboard</Heading>
      </div>
      <div className=" mt-6 mb-8 mx-4 justify-center" style={buttonStyle}>
        <Button large className="w-full">
          Edit Session Schedule
          <img
            src="/images/right_arrow.png"
            alt="Right Arrow"
            style={arrowStyle}
          />
        </Button>
        <br />
        <br />
        <Button large className="w-full">
          View Sessions
          <img
            src="/images/right_arrow.png"
            alt="Right Arrow"
            style={arrowStyle}
          />
        </Button>
      </div>
    </div>
  );
}
