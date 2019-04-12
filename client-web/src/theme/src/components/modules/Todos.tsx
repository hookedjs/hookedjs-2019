import React, { Fragment } from "react";
import { Button } from "rebass";
import { observer, useObservable } from "mobx-react-lite";
import ClassNames from "classnames";
import { TimeGetFromNowShort } from "~/core/polyfills/TimeGetFromNow";
import { TimeNow } from "~/core/polyfills/TimeNow";
import { Todos as TodosState } from "../../state/Todos";

export type props = {};

export const Todos = observer(({}: props) => {
  const todos = useObservable(TodosState);

  return (
    <Fragment>
      <table>
        <thead>
        <tr>
          <th>Task</th>
          <th>Action</th>
          <th>Status</th>
        </tr>
        </thead>

        <tbody>
        {todos.map((t, i) => (
          <tr
            key={`todo-${i}`}
            className={ClassNames({
              rowCompleted: !!t.completedAt,
              rowQueued: !t.completedAt
            })}
          >
            <td>{t.text}</td>
            <td>
              {t.completedAt
                ? <Button variant="outline" onClick={() => (todos[i].completedAt = undefined)}>Undo</Button>
                : <Button variant="primary" onClick={() => (todos[i].completedAt = TimeNow())}>Do</Button>
              }
            </td>
            <td>
              <i>{t.completedAt ? `Completed ${TimeGetFromNowShort(t.completedAt)} ago.` : `Created ${TimeGetFromNowShort(t.createdAt)} ago.`}</i>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
        }
        .rowQueued {
          background: rgba(200,0,0,.4);
        }
        .rowCompleted {
          background: rgba(0,200,0,.4);
        }
      `}</style>
    </Fragment>
  );
});
