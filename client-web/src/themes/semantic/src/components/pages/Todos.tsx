import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Todos as TodosModule} from "../modules/Todos";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "#ddd",
    padding: 10,
    minHeight: "100vh",
  },
});

export type props = WithSheet<typeof style> & {};

export const Todos = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <TodosModule />
      <h3>Again, to show they share a global state</h3>
      <TodosModule />
    </div>
  );
});
export default Todos;
