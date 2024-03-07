/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import { Heading } from "@/components/Heading";
import { SessionInputForm } from "@/components/SessionInputForm";

// TODO: redirect on submit
// TODO: cancel/return button

export default function SessionInputPage() {
  return (
    <div className="p-5">
      <Heading>New Session</Heading>

      <SessionInputForm onSuccess={() => alert("Session created!")} />
    </div>
  );
}
