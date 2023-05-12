import { useState, UIEvent } from "react";

export default function useScrollWithShadow() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    setScrollHeight(e.currentTarget.scrollHeight);
    setClientHeight(e.currentTarget.clientHeight);
  };

  function getBoxShadow() {
    const isBottom = clientHeight === scrollHeight - scrollTop;
    const isTop = scrollTop === 0;
    const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;

    let boxShadow = "none";
    const top = "inset 0 20px 10px -13px rgb(255 255 255 / 1)";
    const bottom = "inset 0 -20px 10px -13px rgb(255 255 255 / 1)";

    if (isTop) {
      boxShadow = bottom;
    } else if (isBetween) {
      boxShadow = `${top}, ${bottom}`;
    } else if (isBottom) {
      boxShadow = top;
    }
    return boxShadow;
  }

  return { boxShadow: getBoxShadow(), onScrollHandler };
}
