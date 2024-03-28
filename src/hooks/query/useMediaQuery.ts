import { useEffect, useState } from "react";

export const useMediaQuery = (query?: string) => {
  const [matches, setMatches] = useState(false);
  const onResize = () => {
    const media = window.matchMedia(`${query}`);
    setMatches(media.matches);
  };
  useEffect(() => {
    onResize();
    addEventListener("resize", () => {
      onResize();
    });
    return removeEventListener("resize", () => {
      onResize();
    });
  }, []);

  return matches;
};
