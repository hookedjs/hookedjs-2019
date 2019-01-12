import { action, autorun } from "mobx";
import * as localforage from "localforage";

export const MobxPersist = action(async (store: any) => {
  for (let fieldName of store.persistedFields || []) {
    const storageKey = `${store.constructor.name}.${fieldName}`;
    // console.log(`mobx.StoreWrapper.hydrate: Hydrating ${storageKey}`);
    // @ts-ignore: Hydrate no index signature
    const storedValue = JSON.parse((await localforage.getItem(
      storageKey
    )) as any);
    if (storedValue) store[fieldName] = storedValue;
    autorun(() => {
      // console.log(`mobx.StoreWrapper.hydrate: Setting ${storageKey} to ${store[fieldName]}`);
      // @ts-ignore: Hydrate no index signature
      localforage.setItem(storageKey, JSON.stringify(store[fieldName]));
    });
  }
  store.isHydrated = true;
});
