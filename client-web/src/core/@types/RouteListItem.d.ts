import * as React from "react";

export type RouteListItem = {
  name: string;
  path: string;
  layout: React.ComponentClass;
  view: React.LazyExoticComponent<any>;
  icon: React.ComponentType<any>;
}
