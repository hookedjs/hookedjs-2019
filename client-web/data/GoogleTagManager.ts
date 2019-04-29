import {autorun} from "mobx";
import {Sleep} from "../polyfills/Sleep";
import {GoogleTagManagerTag} from "../../boilerplate/client-web/config";
import {Cookies} from "../state/Cookies";

class GoogleTagManagerClass {
  public awaitReady = async () => {
    while (!(window as any)['dataLayer']) await Sleep(2000);
  };

  init = autorun(async () => {
    if (!Cookies.allowed || (window as any)["dataLayer"]) return;
    await eval(GoogleTagManagerTag);
  });

  dataLayer = {
    push: async (event: any) => {
      if (!Cookies.allowed) return;
      await this.awaitReady();
      (window as any)['dataLayer'].push(event);
    },
    get: () => (window as any)['dataLayer'] as any[],
  }
}

export const GoogleTagManager = new GoogleTagManagerClass();
