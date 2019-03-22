/**
 * Exports an initialized Mobx store
 */
import {action, observable, computed, autorun} from "mobx";
// import {User, UserUpdate} from "~/core/schema/User";
import {User} from "~/core/schema/User";
// import {UserGetDeviceInfo} from "../utils/UserGetDeviceInfo";
import {Sleep} from "../polyfills/Sleep";
// import {UserSession, UserSessionJourneyItem, UserSessionUpdate} from "~/core/schema/UserSession";
import {UserSessionJourneyItem} from "~/core/schema/UserSession";
import {MobxPersist} from "../polyfills/MobxPersistance";
import {EventStore} from "./EventStore";
// import {TimeNow} from "../utils/TimeNow";
import {Route} from "./RoutingStore";

// Global race-prevention vars
// @ts-ignore: Accessing window custom variable
window.authIsLoading = false;

export class AuthStoreClass {
  persistedFields = ["lastLoadedUserIdAndEmail", "sessionId", "registrationReferrer", "registrationPromoCode", "lastKnownUserEmail"];
  isHydrated = false;

  @observable
  state: "busy" | "anonymous" | "identified" = "busy";

  @observable
  lastLoadedUserIdAndEmail = {id: "", email: ""};
  @observable
  lastKnownUserEmail: string = ""; // for recalling last-login if logged out

  docSubscription: () => void = () => null;
  @observable
  doc: any | null = null;
  @computed
  get docData() {
    // return GetDocData(this.doc) as User;
    return {} as User;
  }

  notificationsSubscription: () => void = () => null;
  @observable
  notifications: any | null = null;

  @observable
  registrationReferrer: string = "";
  @observable
  registrationPromoCode: string = "";

  @observable
  sessionId: string | null = null;
  @computed
  get sessionRef(): any | null {
    // return this.sessionId ? Firebase.firestore().doc(`user_sessions/${this.sessionId}`) : null;
    return this.sessionId ? null : null;
  }

  @action
  handleAuthChange = async (userId: string) => {
    console.log(`Auth.handleAuthChange: Auth Change to User ${userId})`);
    this.unsubscribe();

    while (!this.isHydrated) {
      console.log(`Auth.handleAuthChange: Waiting for hydration`);
      await Sleep(100);
    }

    // @ts-ignore: Accessing window custom variable
    while (window.authIsLoading) {
      console.log(`Auth.handleAuthChange: Waiting for load to finish`);
      await Sleep(100);
    }

    if (this.doc && this.doc.id === userId) {
      console.log(`Auth.handleAuthChange: User ${userId} already loaded -- no-op.`);
      return;
    }

    // Start new Session if no session avail, or if session belongs to another identified user
    if (!this.sessionId || (this.lastLoadedUserIdAndEmail.id && userId !== this.lastLoadedUserIdAndEmail.id && this.lastLoadedUserIdAndEmail.email)) {
      console.log(`Auth.handleAuthChange: Session is null or stale. Starting new session.`);
      // const now = TimeNow();
      // const userSessionData: UserSession = {
      //   createdAt: now,
      //   updatedAt: now,
      //   user: Firebase.firestore()
      //     .collection("users")
      //     .doc(userId),
      //   device: await UserGetDeviceInfo(),
      //   journey: [],
      // };
      // this.sessionId = (await Firebase.firestore()
      //   .collection("user_sessions")
      //   .add(userSessionData)).id;
    } else console.log(`Auth.handleAuthChange: Re-Using Session.`);

    // Merge prior user if was anonymous and uid changed
    if (this.lastLoadedUserIdAndEmail.id && userId !== this.lastLoadedUserIdAndEmail.id && !this.lastLoadedUserIdAndEmail.email) {
      console.log(`Auth.handleAuthChange: Inform backend to merge last loaded user into new.`);
      // RestFunctionPost("UserMerge", {userFromId: this.lastLoadedUserIdAndEmail.id, userToId: userId});
    }

    await this.load(userId);
    this.state = this.docData.email ? "identified" : "anonymous";
    console.log(`Auth.handleAuthChange: Done with state '${this.state}'.`);
  };

  /**
   * Load does a number of things:
   * 1 - Loads user docs into state and subscribes to changes
   * 2 - Updates user.lastLogin
   * 3 - Handles referrer and promo codes for user registrations
   * 4 - Handles race conditions
   * @param userId
   */
  @action
  load = async (userId: string) => {
    console.log(`Auth.load: Loading User ${userId})`);

    // @ts-ignore: Accessing window custom variable
    if (window.authIsLoading) {
      console.log(`Auth.load: Already loading, no-op.`);
      return;
    }
    // @ts-ignore: Accessing window custom variable
    window.authIsLoading = true;

    if (this.doc && this.doc.id === userId) {
      console.log(`Auth.load: User ${userId} already loaded -- no-op.`);
      return;
    }

    while (!this.isHydrated) {
      console.log(`Auth.load: Waiting for hydration`);
      await Sleep(100);
    }

    this.unsubscribe(); // just in still subscribed, do this to clean up possible memory leaks
    await this.subscribe(userId);

    // Update user meta to reflect login
    // const now = TimeNow();
    // const userUpdate: UserUpdate = {
    //   updatedAt: now,
    //   lastLogin: {time: now, device: await UserGetDeviceInfo()},
    // };
    // this.doc!.ref.update(userUpdate);

    if (this.docData.email) {
      this.lastKnownUserEmail = this.docData.email;

      // TODO: Test referrer and promo codes
      if (this.registrationReferrer && !this.docData.referrer) {
        console.log(`Auth.load: Attributing referrer`);
        // RestFunctionPost("UserReferralAttribute", {userId: this.loadedUser.uid, referrerId: this.registrationReferrer});
      }
      if (this.registrationPromoCode && !this.docData.regPromoBalanceTransaction) {
        console.log(`Auth.load: Attributing referrer`);
        // RestFunctionPost("UserPromoApply", {userId: this.loadedUser.uid, promoCode: this.registrationPromoCode});
      }
    }

    this.lastLoadedUserIdAndEmail = {
      id: userId,
      email: this.docData.email || "",
    };
    // @ts-ignore: Accessing window custom variable
    window.authIsLoading = false;
    console.log(`Auth.load: Done`);
  };

  /**
   * Loads user docs into state and subscribes to changes.
   * @param userId
   */
  subscribe = async (userId: string) => {
    console.log(`Auth.subscribe: Subscribing to ${userId}.`);
    // const that = this;

    this.unsubscribe();
    this.doc = null;
    this.notifications = null;

    // this.docSubscription = Firebase.firestore()
    //   .doc(`users/${userId}`)
    //   .onSnapshot((doc) => {
    //     that.doc = doc;
    //   });
    // this.notificationsSubscription = Firebase.firestore()
    //   .collection("user_notifications")
    //   .where("user", "==", Firebase.firestore().doc(`users/${userId}`))
    //   .orderBy("publishedAt", "desc")
    //   .limit(100)
    //   .onSnapshot((docs) => {
    //     that.notifications = docs;
    //   });

    // Wait for docs to populate
    // @ts-ignore: Ignore Typescript naivety - it doesn't understand that these vars can be set elsewhere.
    while (!(this.doc && this.doc.exists)) {
      console.log(`Auth.subscribe: waiting for docs to exist.`);
      await Sleep(400);
    }
    console.log(`Auth.subscribe: Done - Subscriptions are active.`);
  };

  /**
   * Unsubscribe state from realtime database updates. Useful for preparing for a
   * possible change in loaded user, so that API access-control errors are avoided.
   */
  @action
  unsubscribe = () => {
    this.state = "busy";
    if (this.doc) {
      this.docSubscription();
    }
    if (this.notifications) {
      this.notificationsSubscription();
    }
  };

  @observable
  sessionJourney: UserSessionJourneyItem[] = [];
  sessionPushRouteToJourney = async (href: string) => {
    while (!this.sessionRef) {
      console.log(`auth.sessionPushRouteToJourney: Waiting for session to ready`);
      await Sleep(400);
    }
    // const now = TimeNow();
    // this.sessionJourney.push({ts: now, type: "pageView", val: href});
    // const update: UserSessionUpdate = {
    //   updatedAt: now,
    //   journey: this.sessionJourney,
    // };
    // await this.sessionRef.update(update);
  };

  /**
   * Logs a visitor in as anonymous and wait for user docs to load.
   */
  @action
  loginAnonymously = async () => {
    console.log(`Auth.loginAnonymously: Starting`);

    if (this.doc && !this.docData.email) {
      console.log(`Auth.loginAnonymously: Already anonymous. No-Op.`);
      return;
    }

    await this.unsubscribe();
    console.log(`Auth.loginAnonymously: calling firebase`);
    // const authResponse = await LoginAnonymously();

    while (this.state !== "anonymous") {
      console.log(`Auth.loginAnonymously: Waiting for auth to settle`);
      await Sleep(400);
    }

    console.log(`Auth.loginAnonymously: Done`);
    // return authResponse.user!;
  };

  /**
   * Logs a visitor in using email and password and wait for user docs to load. If fails, handle gracefully.
   * @param email
   * @param password
   */
  @action
  loginWithEmailAndPassword = async (email: string, password: string) => {
    console.log(`Auth.loginWithEmailAndPassword: starting with ${email} and *******`);
    if (this.docData.email) {
      console.log(`Auth.loginWithEmailAndPassword: Current user is not anonymous. Logging out.`);
      await this.logout();
    }
    this.unsubscribe();
    try {
      console.log(`Auth.loginWithEmailAndPassword: calling firebase`);
      // const authResponse = await LoginWithEmailAndPassword(email, password);

      while (this.state !== "identified") {
        console.log(`Auth.loginAnonymously: Waiting for auth to settle`);
        await Sleep(100);
      }

      console.log(`Auth.loginWithEmailAndPassword: Done`);
      // return authResponse.user!;
    } catch (e) {
      console.log(`Auth.loginWithEmailAndPassword: Error detected`);
      // await this.subscribe(Firebase.auth().currentUser!.uid);
      this.state = this.docData.email ? "identified" : "anonymous";
      throw e;
    }
  };

  /**
   * Registers a visitor using email and password and wait for user docs to load. If fails, handle gracefully.
   * @param email
   * @param password
   */
  @action
  regWithEmailAndPassword = async (email: string, password: string) => {
    console.log(`Auth.regWithEmailAndPassword: starting with ${email} and *******`);
    if (this.docData.email) {
      console.log(`Auth.regWithEmailAndPassword: Current user is not anonymous. Logging out.`);
      await this.logout();
    }
    this.unsubscribe();
    try {
      console.log(`Auth.regWithEmailAndPassword: calling firebase`);
      // const authResponse = await RegWithEmailAndPassword(email, password);

      while (this.state !== "identified") {
        console.log(`Auth.regWithEmailAndPassword: Waiting for auth to settle`);
        await Sleep(200);
      }

      console.log(`Auth.regWithEmailAndPassword: Done`);
      // return authResponse.user!;
    } catch (e) {
      console.error(`Auth.regWithEmailAndPassword: Error detected`);
      // await this.subscribe(Firebase.auth().currentUser!.uid);
      this.state = this.docData.email ? "identified" : "anonymous";
      throw e;
    }
  };

  /**
   * Logs-in/Registers a visitor using SSO redirect method. If fails, handle gracefully.
   * @param providerString
   */
  @action
  loginSSORedirect = async (providerString: string) => {
    console.log(`Auth.loginSSORedirect: Starting`);
    if (this.docData.email) {
      console.log(`Auth.loginSSORedirect: Current user is not anonymous. Logging out.`);
      await this.logout();
    }
    this.unsubscribe();
    try {
      console.log(`Auth.loginSSORedirect: Redirecting`);
      // await LoginSSORedirect(providerString);
    } catch (e) {
      console.error(`Auth.loginSSORedirect: Error detected`);
      // await this.subscribe(Firebase.auth().currentUser!.uid);
      this.state = this.docData.email ? "identified" : "anonymous";
      throw e;
    }
  };

  /**
   * Logs-in/Registers a visitor using SSO popup method and wait for user docs to load. If fails, handle gracefully.
   * @param providerString
   */
  @action
  loginSSOPopup = async (providerString: string): Promise<{user: any; isNew: boolean; error: string}> => {
    console.log(`Auth.loginSSO: Starting`);
    if (this.docData.email) {
      console.log(`Auth.loginSSO: Current user is not anonymous. Logging out.`);
      await this.logout();
    }
    this.unsubscribe();
    try {
      console.log(`Auth.loginSSO: Opening Pop-up...`);
      // const authResponse = await LoginSSOPopup(providerString);

      while (this.state !== "identified") {
        console.log(`Auth.loginAnonymously: Waiting for auth to settle`);
        await Sleep(200);
      }
      // return {user: authResponse.user!, isNew: authResponse.additionalUserInfo!.isNewUser, error: ""};
      return {user: {}, isNew: true, error: ""};
    } catch (e) {
      console.log(`Auth.loginSSO: Unsuccessful`);
      // await this.subscribe(Firebase.auth().currentUser!.uid);
      this.state = this.docData.email ? "identified" : "anonymous";
      console.dir(e);
      // return {user: Firebase.auth().currentUser, isNew: false, error: e};
      return {user: {}, isNew: true, error: ""};
    }
  };

  @action
  logout = async () => {
    console.log(`Auth.logout: Starting`);
    // @ts-ignore: Accessing window custom variable
    while (this.state === "busy" || window.authIsLoading) {
      await Sleep(200);
      console.log(`Auth.logout: waiting for auth`);
    }
    console.log(`Auth.logout: Ready, calling loginAnonymously...`);
    const authUser = await this.loginAnonymously();
    console.log(`Auth.logout: Done`);
    return authUser;
  };

  handleRouteChangeEvent = autorun(() => {
    if (EventStore.eventLast.code === "routing.change") {
      const route = EventStore.eventLast.meta.route as Route;

      this.sessionPushRouteToJourney(route.href);

      if (route.params.ref) {
        console.log(`auth.handleRouteChangeEvent: ReferrerId (${route.params.ref}) detected in route`);
        this.registrationReferrer = route.params.ref;
      }
      if (route.params.promo) {
        console.log(`auth.handleRouteChangeEvent: PromoCode (${route.params.promo}) detected in route`);
        this.registrationPromoCode = route.params.promo;
      }
    }
  });
}

export const AuthStore = new AuthStoreClass();
MobxPersist(AuthStore);
