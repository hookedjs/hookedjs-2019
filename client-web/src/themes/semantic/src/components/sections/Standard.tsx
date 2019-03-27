import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Container} from "semantic-ui-react";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "white",
    padding: "20px 20px",
    borderRadius: 10,
    marginBottom: 20,
  },
});

export type props = WithSheet<typeof style> & {
  children: React.ReactNode;
};

export const Standard = withSheet(style)(({classes, children}: props) => {
  return <Container className={classes.wrapper}>{children}</Container>;
});
