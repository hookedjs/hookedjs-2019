import {observable} from "mobx";
import {MobxPersist} from "core/polyfills/MobxPersist";

export const LeadProfile = observable({
  contactMethod: "email",
  name: "",
  email: "",
  phone: "",
});

MobxPersist("LeadProfile", LeadProfile);
