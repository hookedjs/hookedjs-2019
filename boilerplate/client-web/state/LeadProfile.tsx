import {observable} from "mobx";
import {MobxPersist} from "hookedjs/client-web/polyfills/MobxPersist";

export const LeadProfile = observable({
  contactMethod: "email",
  name: "",
  email: "",
  phone: "",
});

MobxPersist("LeadProfile", LeadProfile);
