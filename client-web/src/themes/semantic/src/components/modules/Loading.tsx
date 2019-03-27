import * as React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const Loading = withSheet(style)(({classes}: props) => {
  return <span>Loading...</span>;
});
