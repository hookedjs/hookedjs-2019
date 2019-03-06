/**
 * Allows components to switch on component size
 *
 * You may get the ref of a component using the following code:
 * const ref = React.useRef(null);
 *
 */

import * as React from "react";
import { Debounce } from "~/core/polyfills/Debounce";

export const UseComponentSize = (ref: React.MutableRefObject<null>): {width: number, height: number} => {
  // @ts-ignore: ignore missing html prop
  const getCurrentSize = () => ref && ref.current ? { width: ref.current.clientWidth, height: ref.current.clientHeight } : { width: 0, height: 0 };

  const [size, setSize] = React.useState(getCurrentSize());

  const handleResize = () => {
    setSize(getCurrentSize());
  };
  const handleResizeDebounced = Debounce(handleResize, 20, true);

  React.useLayoutEffect(
    () => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResizeDebounced);
      };
    },
    [ref.current]
  ); // watching false means this only fires on mount/dismount

  return size;
};
