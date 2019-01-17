import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import * as qs from "query-string";
import { EventStore } from "~/core/state/EventStore";

import {Routes, ErrorComponent, LoadingComponent} from "~/var/config";
import { TimeNow } from "~/core/utils/TimeNow";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface RouteListItem {
  name: string;
  path: string;
  layout: React.ComponentClass;
  view: React.LazyExoticComponent<any>;
  icon: React.ComponentType<SvgIconProps>;
}

const RouteInnerWrapper = ({
  routeProps,
  children
}: {
  routeProps: RouteComponentProps;
  children: React.ReactNode;
}) => {
  EventStore.dispatch("react.render", {
    route: {
      ts: TimeNow(),
      href: window.location.href,
      path: routeProps.match.path,
      params: {
        ...routeProps.match.params,
        ...routeProps.location.state,
        ...qs.parse(routeProps.location.search)
      },
      isExact: routeProps.match.isExact,
      url: routeProps.match.url
      // key: routeProps.location.key,
      // context: routeProps.staticContext,
      // hash: routeProps.location.hash,
      // search: routeProps.location.search,
      // pathname: routeProps.location.pathname,
      // queryArgs: qs.parse(routeProps.location.search),
    }
  });
  return <React.Fragment>{children}</React.Fragment>;
};

export const Router = () => {
  const SuspenseFallback = LoadingComponent;

  return (
    <BrowserRouter>
      <Switch>
        {Object.values(Routes).map((route, routeIndex) => (
          <Route
            key={`route-${route.path}`}
            exact
            path={route.path}
            render={routeProps => (
              <RouteInnerWrapper routeProps={routeProps}>
                <route.layout>
                  <React.Suspense fallback={SuspenseFallback}>
                    <route.view />
                  </React.Suspense>
                </route.layout>
              </RouteInnerWrapper>
            )}
          />
        ))}

        <Route
          render={props => (
            <RouteInnerWrapper routeProps={props}>
              {ErrorComponent}
            </RouteInnerWrapper>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
