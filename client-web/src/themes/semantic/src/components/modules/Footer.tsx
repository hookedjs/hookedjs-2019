import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "#a3a3",
  },
});

export type props = WithSheet<typeof style> & {};

export const Footer = withSheet(style)(({classes}: props) => {
  return <div className={classes.wrapper}>Footer</div>;
});
