import * as React from "react";
import {Sidebar} from "../layouts/Sidebar";
import {Loading as LoadingModule} from "../modules/Loading";

export type props = {};

export const Loading = ({}: props) => {
  return (
    <Sidebar>
      <LoadingModule />
    </Sidebar>
  );
};
export default Loading;
