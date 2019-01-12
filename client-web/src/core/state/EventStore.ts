/**
 * Centralized Event Pub/Subscribe in the App
 */

import { observable } from "mobx";
import { MobxPersist } from "../utils/MobxPersistance";
import { TimeNow } from "../utils/TimeNow";

export interface Event {
  timestamp: number;
  code: string;
  meta: any;
}

export class EventStoreClass {
  persistedFields = ["eventHistory"];
  isHydrated = false;

  @observable
  eventHistory: Event[] = [];

  @observable
  eventLast: Event = { timestamp: TimeNow(), code: "init", meta: null };

  dispatch = async (eventCode: string, meta?: any) => {
    console.log(`EventStore.dispatch: Received ${eventCode}`);
    const event = { timestamp: TimeNow(), code: eventCode, meta: meta };
    // TODO: Memory Leak: Reduce event history size when size > 500 && size % 100
    this.eventHistory.push(event);
    this.eventLast = event;
  };
}

export const EventStore = new EventStoreClass();
MobxPersist(EventStore);
