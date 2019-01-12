import { Device } from "./Device";

export interface UserCounts {
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  liked: number;
  disliked: number;
  viewed: number;
  shared: number;
  referral: number;
  videos: number;
}

export interface User {
  createdAt: number;
  updatedAt: number;
  lastLogin?: {
    time: number;
    device: Device;
  };
  handle: string;
  nameDisplay: string;
  nameFirst: string;
  nameLast: string;
  email: string;
  photoURL: string;
  thumbURL: string;
  phoneNumber: string;
  role: 0 | 3 | 6 | 16; // developer/suadmin/admin/userDefault
  referrer?: string;
  status: 0 | 1; // inactive/active
  mergedTo?: string;
  regPromoBalanceTransaction?: string; // used for merging users
  balance: number;
  counts: UserCounts;
  badges: {
    [badgename: string]: {
      createdAt: number;
      comment: string;
    };
  };
}

export interface UserUpdate {
  updatedAt: number;
  lastLogin?: {
    time: number;
    device: Device;
  };
  handle?: string;
  nameDisplay?: string;
  nameFirst?: string;
  nameLast?: string;
  email?: string;
  photoURL?: string;
  thumbURL?: string;
  phoneNumber?: string;
  role?: 0 | 3 | 6 | 16; // developer/suadmin/admin/userDefault
  referrer?: string;
  status?: 0 | 1; // inactive/active
  mergedTo?: string;
  regPromoBalanceTransaction?: string; // used for merging users
  balance?: number;
  counts?: UserCounts;
  badges?: {
    [badgename: string]: {
      createdAt: number;
      comment: string;
    };
  };
}
