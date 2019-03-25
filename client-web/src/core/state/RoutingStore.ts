/**
 * Provides Routing State
 *
 * Designed to be compatible with both web and mobile.
 */
import {observable, autorun, computed} from "mobx";
import {Sleep} from "../polyfills/Sleep";
import {StringContains} from "../polyfills/PrimitiveUtils";
import * as GoogleAnalytics from "react-ga";
import {GoogleAnalyticsTags} from "~/var/config";
import {MobxPersistOld} from "../polyfills/MobxPersistOld";
import {EventStore} from "./EventStore";
import {TimeNow} from "../polyfills/TimeNow";

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
    if (this.isWeb && GoogleAnalyticsTags.web) {
      this.googleAnalyticsId = GoogleAnalyticsTags.web;
      GoogleAnalytics.initialize(GoogleAnalyticsTags.web);
    }
    if (!this.isWeb && GoogleAnalyticsTags.native) {
      this.googleAnalyticsId = GoogleAnalyticsTags.native;
      GoogleAnalytics.initialize(GoogleAnalyticsTags.native);
    }
  }
  persistedFields = ["route", "routeHistory", "routeHistoryHrefs"];
  isHydrated = false;

  isWeb = !!window;

  @observable
  routeHistory: Route[] = [];
  @computed
  get route() {
    if (this.routeHistory.length) return this.routeHistory[this.routeHistory.length - 1];
    else
      return {
        ts: 0,
        href: "",
        url: "",
        path: "",
        params: {},
        isExact: false,
      };
  }

  pushRoute = async (routeNext: Route) => {
    console.log(`routing.pushRoute: pushing ${JSON.stringify(routeNext)}`);

    if (routeNext.href === this.route.href && TimeNow() - this.route.ts < 1000) {
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
      if (this.googleAnalyticsId) await this.googleAnalyticsTrackPageView(routeNext.href);
      else console.log(`mobx.routing.onrouteChange: Skipping GATrackPageView bc ${routeNext.href} is blacklisted from tracking`);
    }

    EventStore.dispatch("routing.change", {route: routeNext});

    console.log(`routing.pushRoute: Done pushing ${JSON.stringify(routeNext)} `);
  };

  getBackRouteWithFilters = ({excludes = [], search}: {excludes?: string[]; search?: string}): string => {
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
    if (!this.googleAnalyticsId) throw Error(`mobx.routing.googleAnalyticsTrackPageView: Error - google analytics id is missing in config.`);
    GoogleAnalytics.set({uri});
    await GoogleAnalytics.pageview(uri);
  };

  handleRouteChangeEvent = autorun(() => {
    if (EventStore.eventLast.code === "react.render") {
      this.pushRoute(EventStore.eventLast.meta.route);
    }
  });
}

export const RoutingStore = new RoutingStoreClass();
MobxPersistOld(RoutingStore);
