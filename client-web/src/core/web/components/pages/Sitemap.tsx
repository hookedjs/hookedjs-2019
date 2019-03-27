import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Sitemap as SitemapModule} from "../modules/Sitemap";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const Sitemap = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <h1>Sitemap</h1>
      <SitemapModule />
    </div>
  );
});
export default Sitemap;
