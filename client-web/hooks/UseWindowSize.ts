/**
 * Will allow for watching window size.
 * Caution: Using this will force a re-render of a component every second, so will make window resizing choppy for
 * with high level components I recommend you favor useCssBreakPoint most of the time
 */

import * as React from "react";
import {Debounce} from "../polyfills/Debounce";

export function UseWindowSize() {
  const getCurrentSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [windowSize, setWindowSize] = React.useState(getCurrentSize());

  const handleResize = () => {
    setWindowSize(getCurrentSize());
  };
  const handleResizeDebounced = Debounce(handleResize, 20, true);

  React.useLayoutEffect(() => {
    window.addEventListener("resize", handleResizeDebounced);
    return () => {
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, [false]); // watching false means this only fires on mount/dismount

  return windowSize;
}
