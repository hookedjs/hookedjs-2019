/**
 * Note: Pages cannot import sitemap b/c it's cyclic dependency.
 *
 */
import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Link} from "react-router-dom";
import {Routes} from "~/var/config";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const Sitemap = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <ul>
        {Object.values(Routes).map((r, i) => (
          <li key={`route-${i}`}>
            <Link to={r.path}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
