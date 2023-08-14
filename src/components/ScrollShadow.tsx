import React, { useEffect } from "react";

export default function ScrollShadow({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("scroll-shadow-element");
  });
  return <scroll-shadow>{children}</scroll-shadow>;
}
