/**
 * Will allow for watching changes to css breakpoints.
 * Is useful for when you can't/dislike using CSS to watch breakpoints
 */

import * as React from "react";
import { Debounce } from "~/core/utils/Debounce";
import { StringContains } from "~/core/utils/PrimitiveUtils";

export function UseCssBreakPoint() {
  const getCurrentBreakPoint = () => {
    const w = window.innerWidth;
    if (w < 575) return "xs";
    if (w < 768) return "sm";
    if (w < 992) return "md";
    if (w < 1200) return "lg";
    return "xl";
  };

  const [breakPoint, setBreakPoint] = React.useState(getCurrentBreakPoint());

  let breakPointLast = breakPoint;

  const handleResize = () => {
    const breakPointNext = getCurrentBreakPoint();
    // breakPointNext !== breakPoint && setBreakPoint(breakPointNext); // breakPoint doesn't seem to update locally, so use bpl
    if (breakPointNext !== breakPointLast) {
      setBreakPoint(breakPointNext);
      breakPointLast = breakPointNext;
    }
  };
  const handleResizeDebounced = Debounce(handleResize, 20, true);

  React.useEffect(
    () => {
      window.addEventListener("resize", handleResizeDebounced);
      return () => {
        window.removeEventListener("resize", handleResizeDebounced);
      };
    },
    [false]
  ); // watching false means this only fires on mount/dismount

  return {
    value: breakPoint,
    search: (s: string[] | string): boolean => StringContains(breakPoint, s)
  };
}
