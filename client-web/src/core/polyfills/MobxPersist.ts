import * as localforage from "localforage";
import {observe, toJS} from "mobx";

export const MobxPersist = async (key, observableInstance) => {
  const v = await localforage.getItem(key);
  if (v) {
    if (observableInstance.replace) observableInstance.replace(v);
    else if (typeof v === "object") {
      Object.keys(v).forEach((k) => (observableInstance[k] = v[k]));
    } else observableInstance = v;
  }
  observe(observableInstance, (change) => {
    // localforage.setItem(key, change.object.toJSON());
    // localforage.setItem(key, change.newValue);
    localforage.setItem(key, toJS(observableInstance));
  });
};
