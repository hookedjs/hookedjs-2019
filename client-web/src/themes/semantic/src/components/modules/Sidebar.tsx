import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Sitemap} from "core/web/components/modules/Sitemap";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "lightgray",
    minHeight: "calc( 100vh - 84px )",
  },
});

export type props = WithSheet<typeof style> & {};

export const Sidebar = withSheet(style)(({classes}: props) => {
  return <div className={classes.wrapper}>
    Sidebar
    <Sitemap />
  </div>;
});
