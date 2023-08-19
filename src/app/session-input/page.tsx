/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import SessionInputForm from "@/components/SessionInputForm/SessionInputForm";

export default function SessionInputPage() {
  return (
    <div className="p-5">
      <Heading>Session Input</Heading>

      <SessionInputForm />
      
    </div>
  );
}
