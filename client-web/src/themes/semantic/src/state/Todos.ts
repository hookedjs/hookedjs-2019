import {observable} from "mobx";
import {TimeNow} from "core/polyfills/TimeNow";
import {MobxPersist} from "core/polyfills/MobxPersist";

export type todo = {
  createdAt: number;
  text: string;
  completedAt?: number;
};

export const Todos: todo[] = observable.array([{createdAt: TimeNow() - 3000, text: "Do something awesome"}, {createdAt: TimeNow() - 90000, text: "Do another awesome"}]);
MobxPersist("Todos", Todos);
