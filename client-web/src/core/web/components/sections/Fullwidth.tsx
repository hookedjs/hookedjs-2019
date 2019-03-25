import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
  },
});

export type props = WithSheet<typeof style> & {
  children: React.ReactNode;
};

export const Fullwidth = withSheet(style)(({classes, children}: props) => {
  return <div className={classes.wrapper}>{children}</div>;
});
