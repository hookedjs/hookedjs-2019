import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import * as qs from "query-string";
import { paramCase } from "change-case";
import { ThemeProvider } from "styled-components";
import { EventStore } from "./state/EventStore";
import { TimeNow } from "./polyfills/TimeNow";
import Theme from "@project/client-web/Theme";
import { Error as ErrorPage } from "@project/client-web/pages/Error";
import { Loading as LoadingPage } from "@project/client-web/pages/Loading";

type RouteInnerWrapperProps = {
  routeProps: RouteComponentProps;
  children: React.ReactNode;
};
// TODO: Insead of doing this weird wrapper, maybe use history.listen(location => {})
const RouteInnerWrapper = ({ routeProps, children }: RouteInnerWrapperProps) => {
  // console.log(routeProps.location.pathname);
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
  const SuspenseFallback = <LoadingPage/>;

  const pages = JSON.parse(process.env.PAGES as string);
  if (!Array.isArray(pages)) throw new Error("No pages have been detected.");

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Switch>
          {pages.map(page => (
            <Route
              key={`route-${page}`}
              exact
              path={page === "Index" ? "/" : `/${paramCase(page)}`}
              render={(routeProps) => {
                console.log(`@project/client-web/pages/${page}`);
                const PageModule = React.lazy(() => import(`@project/client-web/pages/${page}`));
                return (
                  <RouteInnerWrapper routeProps={routeProps}>
                    <React.Suspense fallback={SuspenseFallback}>
                      <PageModule/>
                    </React.Suspense>
                  </RouteInnerWrapper>
                );
              }}
            />
          ))}

          <Route render={(props) => <RouteInnerWrapper routeProps={props}><ErrorPage/></RouteInnerWrapper>}/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};
