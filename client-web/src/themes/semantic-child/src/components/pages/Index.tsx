import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const Index = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <h1>Semantic-UI Theme</h1>
      <p>This is a child-theme of Semantic, which is based on the Semantic-UI kit.</p>
    </div>
  );
});
export default Index;
