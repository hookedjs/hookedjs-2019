import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Link} from "react-router-dom";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
  },
});

export type props = WithSheet<typeof style> & {};

export const Index = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <h1>Welcome to HookedJS</h1>
      <Link to="/sitemap">View Sitemap</Link>
    </div>
  );
});
export default Index;
