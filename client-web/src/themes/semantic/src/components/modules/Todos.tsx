import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Table, Button} from "semantic-ui-react";
import {Observer, useObservable} from "mobx-react-lite";
import ClassNames from "classnames";
import {TimeGetFromNowShort} from "core/polyfills/TimeGetFromNow";
import {TimeNow} from "core/polyfills/TimeNow";
import {Todos as TodosState} from "../../state/Todos";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "white",
    padding: "20px 20px",
    borderRadius: 10,
  },
  rowQueued: {
    background: "rgba(200,0,0,.4)",
  },
  rowCompleted: {
    background: "rgba(0,200,0,.4)",
  },
});

export type props = WithSheet<typeof style> & {};

export const Todos = withSheet(style)(({classes}: props) => {
  const todos = useObservable(TodosState);

  return (
    <div className={classes.wrapper}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Task</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Observer
          render={() => (
            <Table.Body>
              {todos.map((t, i) => (
                <Table.Row
                  key={`todo-${i}`}
                  className={ClassNames({
                    [classes.rowCompleted]: !!t.completedAt,
                    [classes.rowQueued]: !t.completedAt,
                  })}
                >
                  <Table.Cell>{t.text}</Table.Cell>
                  <Table.Cell collapsing>
                    {t.completedAt ? <Button onClick={() => (todos[i].completedAt = undefined)}>Undo</Button> : <Button onClick={() => (todos[i].completedAt = TimeNow())}>Do</Button>}
                  </Table.Cell>
                  <Table.Cell collapsing>{t.completedAt ? <i>Completed {TimeGetFromNowShort(t.completedAt)} ago.</i> : <i>Created {TimeGetFromNowShort(t.createdAt)} ago.</i>}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        />
      </Table>
    </div>
  );
});
