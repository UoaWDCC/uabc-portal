"use client";

import TextInput from "@/components/TextInput/TextInput";
import { useState } from "react";

export default function HomePage() {
  const [value, setValue] = useState("");
  return (
    <div>
      <p>Welcome to UABC Booking Portal.</p>
      <TextInput
        label="Label"
        value={value}
        onChange={setValue}
      />
      <p>{value}</p>
    </div>
  )
}