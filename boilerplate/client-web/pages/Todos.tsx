import React from "react";
import {Todos as TodosModule} from "../modules/Todos";
import {Sidebar} from "../layouts/Sidebar";

export type props ={};

export const Todos = ({}: props) => {
  return (
    <Sidebar>
      <TodosModule />
      <h3>Again, to show they share a global state</h3>
      <TodosModule />
    </Sidebar>
  );
};
export default Todos;
