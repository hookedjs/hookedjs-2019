import * as localforage from "localforage";
import { toJS, reaction } from "mobx";

export const MobxPersist = async (key: string, observableInstance: any) => {
  console.log(`Persisting ${key}`);
  const v = await localforage.getItem(key);
  if (v) {
    if (observableInstance.replace) observableInstance.replace(v);
    else if (typeof v === "object") {
      // @ts-ignore: Ignore no signature
      Object.keys(v).forEach((k) => (observableInstance[k] = v[k]));
    } else observableInstance = v;
  }
  // observe(observableInstance, (change) => { // doesn't work anymore
  reaction(() => toJS(observableInstance),() => {
  // autorun(() => {
    // console.dir(change);
    // localforage.setItem(key, change.object.toJSON());
    // localforage.setItem(key, change.newValue);
    localforage.setItem(key, toJS(observableInstance));
  });
};
