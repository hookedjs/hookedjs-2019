import * as React from "react";
import {Link} from "react-router-dom";
import withSheet, {StyleCreator, WithSheet} from "react-jss";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {
  title?: string;
  content?: string;
};

export const Error = withSheet(style)(({title = "404", content = "Sorry, the route you requested does not exist"}: props) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        <Link to="/" className="btn btn-primary">
          Want to report this?
        </Link>
      </p>
    </div>
  );
});
export default Error;
