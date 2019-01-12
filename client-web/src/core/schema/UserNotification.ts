export interface UserNotification {
  user: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number; // Allows for scheduling
  type: "i" | "a" | "w"; // info / alert / warning
  template: "l"; // link
  content: {
    headline: string;
    link?: string;
    body?: string;
    icon?: string;
  };
  status: "n" | "r"; // new / read
}

export interface UserNotificationUpdate {
  user?: string;
  updatedAt: number;
  publishedAt?: number; // Allows for scheduling
  type?: "i" | "a" | "w"; // info / alert / warning
  template?: "l"; // link
  content?: {
    headline: string;
    link?: string;
    body?: string;
    icon?: string;
  };
  status?: "n" | "r"; // new / read
}
