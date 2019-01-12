import { Device } from "./Device";

export interface UserSessionJourneyItem {
  ts: number;
  type: string;
  val: string;
}

export interface UserSession {
  createdAt: number;
  updatedAt: number;
  user: string;
  device: Device;
  journey: UserSessionJourneyItem[];
}

export interface UserSessionUpdate {
  updatedAt: number;
  user?: string;
  device?: Device;
  journey?: UserSessionJourneyItem[];
}
