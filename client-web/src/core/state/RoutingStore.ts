/**
 * Provides Routing State
 *
 * Designed to be compatible with both web and mobile.
 */
import { observable, autorun, computed } from "mobx";
import { Sleep } from "../utils/Sleep";
import { StringContains } from "../utils/PrimitiveUtils";
import * as GoogleAnalytics from "react-ga";
import { App } from "~/var/config";
import { MobxPersist } from "../utils/MobxPersistance";
import { EventStore } from "./EventStore";
import { TimeNow } from "../utils/TimeNow";

export interface Route {
  ts: number;
  href: string;
  url: string;
  path: string;
  params: {
    [key: string]: any;
  };
  isExact: boolean;
}

export class RoutingStoreClass {
  constructor() {
    if (App.integrations.google && App.integrations.google.analytics) {
      this.googleAnalyticsId = this.isNativeOrWeb
        ? App.integrations.google.analytics.web
        : App.integrations.google.analytics.native;
      GoogleAnalytics.initialize(this.googleAnalyticsId);
    }
  }
  persistedFields = ["route", "routeHistory", "routeHistoryHrefs"];
  isHydrated = false;

  isNativeOrWeb = window ? "web" : "native";

  @observable
  routeHistory: Route[] = [];
  @computed
  get route() {
    if (this.routeHistory.length)
      return this.routeHistory[this.routeHistory.length - 1];
    else
      return {
        ts: 0,
        href: "",
        url: "",
        path: "",
        params: {},
        isExact: false
      };
  }

  pushRoute = async (routeNext: Route) => {
    console.log(`routing.pushRoute: pushing ${JSON.stringify(routeNext)}`);

    if (
      routeNext.href === this.route.href &&
      TimeNow() - this.route.ts < 1000
    ) {
      console.log(`routing.sessionPushRouteToJourney: same href, no-op`);
      return;
    }

    while (!this.isHydrated) {
      // Wait for all stores to hydrate
      console.log(`routing.pushRoute: Waiting for hydration`);
      await Sleep(200);
    }

    this.routeHistory.push(routeNext);

    if (!StringContains(routeNext.href, ["localhost", "127.0.0.1"])) {
      if (this.googleAnalyticsId)
        await this.googleAnalyticsTrackPageView(routeNext.href);
      else
        console.log(
          `mobx.routing.onrouteChange: Skipping GATrackPageView bc ${
            routeNext.href
          } is blacklisted from tracking`
        );
    }

    EventStore.dispatch("routing.change", { route: routeNext });

    console.log(
      `routing.pushRoute: Done pushing ${JSON.stringify(routeNext)} `
    );
  };

  getBackRouteWithFilters = ({
    excludes = [],
    search
  }: {
    excludes?: string[];
    search?: string;
  }): string => {
    const history = this.routeHistory;

    for (let route of history.slice().reverse()) {
      if (search && route.href.indexOf(search) === -1) continue;

      let excluded = false;
      for (let x of excludes) {
        if (route.href.indexOf(x) !== -1) excluded = true;
      }
      if (excluded) continue;

      return route.path;
    }

    return "/";
  };

  googleAnalyticsId: string | undefined;
  googleAnalyticsTrackPageView = async (uri: string) => {
    console.log(`GATracking uri = ${uri}`);
    if (!this.googleAnalyticsId)
      throw Error(
        `mobx.routing.googleAnalyticsTrackPageView: Error - google analytics id is missing in config.`
      );
    GoogleAnalytics.set({ uri });
    await GoogleAnalytics.pageview(uri);
  };

  handleRouteChangeEvent = autorun(() => {
    if (EventStore.eventLast.code === "react.render") {
      this.pushRoute(EventStore.eventLast.meta.route);
    }
  });
}

export const RoutingStore = new RoutingStoreClass();
MobxPersist(RoutingStore);
