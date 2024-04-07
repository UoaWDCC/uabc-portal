"use client";

import React, { useState } from "react";

import { Button } from "@/components/Button";

const MembershipType = () => {
  const [selectedMembership, setSelectedMembership] = useState<
    "member" | "non-member" | null
  >(null);

  const handleButtonClick = (isMember: boolean) => {
    setSelectedMembership(isMember ? "member" : "non-member");
  };

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleNextButtonClick = () => {
    // Navigate to the home page
    window.location.href = "/";
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-6 gap-4 mt-6 mb-5">
        <button
          className="flex items-center space-x-2 px-4 rounded-md hover:text-primary"
          onClick={handleBackButtonClick}
        >
          <span>&#8592;</span>
          <span>Back</span>
        </button>
        <div className="grid grid-cols-subgrid gap-4 col-span-5">
          <div className="col-start-1 col-end-6 px-8">
            Select your membership type
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 my-8">
        <div></div>
        <div className="grid grid-cols-subgrid gap-4 col-span-4">
          <label
            className={`col-start-1 col-end-5 py-4 px-8 shadow rounded flex flex-col ${
              selectedMembership === "member"
                ? "bg-primary text-secondary hover:bg-primary/85 hover:text-secondary"
                : "bg-secondary hover:bg-primary/85 hover:text-secondary"
            }`}
            onClick={() => handleButtonClick(true)}
          >
            <input
              type="radio"
              name="membershipType"
              className="hidden"
            ></input>
            <h2 className="text-lg text-left font-bold text-wrap">
              Prepaid Member
            </h2>
            <p className="text-left text-wrap">
              Package of 6, 11 or 22 prepaid sessions for the semester
            </p>
            <p className="text-left text-wrap">
              (limit of 2 sessions per week)
            </p>
          </label>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-6 gap-4 my-8">
        <div></div>
        <div className="grid grid-cols-subgrid gap-4 col-span-4">
          <label
            className={`col-start-1 col-end-5 py-4 px-8 shadow rounded flex flex-col ${
              selectedMembership === "non-member"
                ? "bg-primary text-secondary hover:bg-primary/85 hover:text-secondary"
                : "bg-secondary hover:bg-primary/85 hover:text-secondary"
            }`}
            onClick={() => handleButtonClick(false)}
          >
            <input
              type="radio"
              name="membershipType"
              className="hidden"
            ></input>
            <h2 className="text-lg text-left font-bold text-wrap">
              Non-Member (Casual)
            </h2>
            <p className="text-left text-wrap">$15.00 per session</p>
            <p className="text-left text-wrap">(limit of 1 session per week)</p>
          </label>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-96">
        <div></div>
        <div className="grid grid-cols-subgrid gap-4 col-span-4">
          <Button
            className="col-start-1 col-end-5 bg-primary text-secondary hover:bg-primary/90 rounded"
            onClick={handleNextButtonClick}
          >
            Next
          </Button>
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default MembershipType;
