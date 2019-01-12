export interface AppMeta {
  createdAt: number;
  updatedAt: number;
}
export interface AppMetaUpdate {
  updatedAt: number;
}

export interface AppMetaWithWildcard extends AppMeta {
  [key: string]: any;
}

export interface AppMetaUsers extends AppMeta {
  counts: {
    anonymous: number;
    registered: number;
  };
}
export interface AppMetaUsersUpdate extends AppMetaUpdate {
  counts: {
    anonymous: number;
    registered: number;
  };
}

export interface AppMetaVideos extends AppMeta {
  counts: {
    published: number;
  };
}
export interface AppMetaVideosUpdate extends AppMetaUpdate {
  counts: {
    published: number;
  };
}
