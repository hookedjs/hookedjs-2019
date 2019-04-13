import React from "react";

export type props = {
  children: React.ReactNode;
};

export const Standard = ({children}: props) => {
  return <div>{children}</div>;
};
