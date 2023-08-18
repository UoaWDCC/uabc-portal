"use client";

import LevelSelector from "@/components/LevelSelector/LevelSelector";
import TextInput from "@/components/TextInput/TextInput";
import { useState } from "react";

const defaultLevel = "intermediate";

export default function HomePage() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(defaultLevel);

  return (
    <div>
      <p>Welcome to UABC Booking Portal.</p>
      <TextInput label="Label" value={value} onChange={setValue} type={""} isError={false} />
      <p>Text input value: {value}</p>
      <button onClick={() => setOpen(true)}>Open level selector</button>
      <LevelSelector
        isOpened={open}
        onClose={() => setOpen(false)}
        default={defaultLevel}
        onSelect={setLevel}
      />
      <p>Level: {level}</p>
    </div>
  );
}
