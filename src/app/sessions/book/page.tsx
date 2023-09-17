"use client";

import LevelSelector from "@/components/LevelSelector/LevelSelector";
import { useState } from "react";

const defaultLevel = "intermediate";

export default function BookSessionPage() {
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(defaultLevel);
  
    return (
      <div>
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