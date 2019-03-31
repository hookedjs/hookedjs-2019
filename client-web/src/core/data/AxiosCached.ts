// Import dependencies
import {setup} from "axios-cache-adapter";
import * as localforage from "localforage";
import memoryDriver from "localforage-memoryStorageDriver";

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
export const AxiosCached = setup({
  baseURL: "/api/1.0",
  timeout: 1000,

  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000,
    store: localforage.createInstance({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, memoryDriver._driver],
      name: "axios",
    }),
  },
});
