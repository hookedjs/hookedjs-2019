import * as React from "react";
import {Link} from "react-router-dom";
import {Sidebar} from "../layouts/Sidebar";

export type props = {
  title?: string;
  content?: string;
};

export const Error = ({title = "404", content = "Sorry, the route you requested does not exist"}: props) => {
  return (
    <Sidebar>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        <Link to="/" className="btn btn-primary">
          Want to report this?
        </Link>
      </p>
    </Sidebar>
  );
};
export default Error;
