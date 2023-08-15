import { ReactNode, useEffect } from "react";

export default function ScrollShadow({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    import("scroll-shadow-element");
  });
  return <scroll-shadow>{children}</scroll-shadow>;
}
