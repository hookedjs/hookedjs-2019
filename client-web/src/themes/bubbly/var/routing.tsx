import * as React from "react";
import { RouteListItem } from "~/core/Router";

import DashboardIcon from "@material-ui/icons/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import WidgetsIcon from "@material-ui/icons/Widgets";
import TimelineIcon from "@material-ui/icons/Timeline";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// Layouts
import AuthLayout from "~/themes/bubbly/components/layouts/Auth/Auth";
import SidebarLayout from "~/themes/bubbly/components/layouts/Sidebar/Sidebar";

import { ErrorRow } from "~/themes/bubbly/components/rows/ErrorRow/ErrorRow";

export const ErrorComponent = (
  <SidebarLayout>
    <ErrorRow title="404" content="Sorry, the route you requested does not exist" />
  </SidebarLayout>
);

export { LoadingRow as LoadingComponent } from "~/themes/bubbly/components/rows/LoadingRow/LoadingRow";

// Normal Pages
const Posts = React.lazy(() => import("~/themes/bubbly/components/pages/Posts/Posts"));


// Demo Pages
const LoginDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Login/Login"));
const RegisterDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Register/Register"));
const LockScreenDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Lock/Lock"));
const UserProfileDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/User/UserProfile"));
const DashboardDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Dashboard/Dashboard"));
const ButtonsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Buttons/Buttons"));
const GridSystemDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Grid/GridSystem"));
const PanelsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Panels/Panels"));
const SweetAlertDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/SweetAlert/SweetAlert"));
const NotificationsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Notifications/Notifications"));
const IconsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Icons/Icons"));
const TypographyDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Typography/Typography"));
const RegularFormsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Forms/RegularForms"));
const ExtendedFormsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Forms/ExtendedForms"));
const ValidationFormsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Forms/ValidationForms"));
const WizardDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Forms/Wizard"));
const RegularTablesDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Tables/RegularTables"));
const ExtendedTablesDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Tables/ExtendedTables"));
const ReactTablesDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Tables/ReactTables"));
const GoogleMapsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Maps/GoogleMaps"));
const FullScreenMapDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Maps/FullScreenMap"));
const VectorMapDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Maps/VectorMap"));
const ChartsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Charts/Charts"));
const CalendarDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Calendar/Calendar"));
const WidgetsDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Widgets/Widgets"));
const TimelineDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Timeline/Timeline"));
const RTLSupportDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/RTLSupport/RTLSupport"));
const PricingDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Pricing/Pricing"));

export const DemoRoutes: {[key: string]: RouteListItem} = {
  BubblyRegisterDemo: {name: `Register`, path: `/bubbly/demo/register`, layout: AuthLayout, view: RegisterDemo, icon: PersonAddIcon},
  BubblyLoginDemo: {name: `Login`, path: `/bubbly/demo/login`, layout: AuthLayout, view: LoginDemo, icon: FingerprintIcon},
  BubblyLockDemo: {name: `Lock`, path: `/bubbly/demo/lock`, layout: AuthLayout, view: LockScreenDemo, icon: LockOpenIcon},
  BubblyUserProfileDemo: {name: `User Profile`, path: `/bubbly/demo/user-profile`, layout: SidebarLayout, view: UserProfileDemo, icon: AppsIcon},
  BubblyDashboardDemo: {name: `Dashboard`, path: `/bubbly/demo/dashboard`, layout: SidebarLayout, view: DashboardDemo, icon: DashboardIcon},
  BubblyTimelineDemo: {name: `Timeline`, path: `/bubbly/demo/timeline`, layout: SidebarLayout, view: TimelineDemo, icon: TimelineIcon},
  BubblyRtlDemo: {name: `Rtl`, path: `/bubbly/demo/rtl`, layout: SidebarLayout, view: RTLSupportDemo, icon: AppsIcon},
  BubblyPricingDemo: {name: `Pricing`, path: `/bubbly/demo/pricing`, layout: SidebarLayout, view: PricingDemo, icon: AppsIcon},
  BubblyButtonsDemo: {name: `Buttons`, path: `/bubbly/demo/buttons`, layout: SidebarLayout, view: ButtonsDemo, icon: AppsIcon},
  BubblyGridDemo: {name: `Grid`, path: `/bubbly/demo/grid-system`, layout: SidebarLayout, view: GridSystemDemo, icon: AppsIcon},
  BubblyPanelsDemo: {name: `Panels`, path: `/bubbly/demo/panels`, layout: SidebarLayout, view: PanelsDemo, icon: AppsIcon},
  BubblySweetDemo: {name: `Sweet-alert`, path: `/bubbly/demo/sweet-alert`, layout: SidebarLayout, view: SweetAlertDemo, icon: AppsIcon},
  BubblyNotificationsDemo: {name: `Notifications`, path: `/bubbly/demo/notifications`, layout: SidebarLayout, view: NotificationsDemo, icon: AppsIcon},
  BubblyIconsDemo: {name: `Icons`, path: `/bubbly/demo/icons`, layout: SidebarLayout, view: IconsDemo, icon: AppsIcon},
  BubblyTypographyDemo: {name: `Typography`, path: `/bubbly/demo/typography`, layout: SidebarLayout, view: TypographyDemo, icon: AppsIcon},
  BubblyRegularFormsDemo: {name: `Regular Forms`, path: `/bubbly/demo/regular-forms`, layout: SidebarLayout, view: RegularFormsDemo, icon: AppsIcon},
  BubblyExtendedFormsDemo: {name: `Extended Forms`, path: `/bubbly/demo/extended-forms`, layout: SidebarLayout, view: ExtendedFormsDemo, icon: AppsIcon},
  BubblyValidationFormsDemo: {name: `Validation Forms`, path: `/bubbly/demo/validation-forms`, layout: SidebarLayout, view: ValidationFormsDemo, icon: AppsIcon},
  BubblyWizardDemo: {name: `Wizard`, path: `/bubbly/demo/wizard`, layout: SidebarLayout, view: WizardDemo, icon: AppsIcon},
  BubblyRegularTablesDemo: {name: `Regular Tables`, path: `/bubbly/demo/regular-tables`, layout: SidebarLayout, view: RegularTablesDemo, icon: AppsIcon},
  BubblyExtendedTablesDemo: {name: `Extended Tables`, path: `/bubbly/demo/extended-tables`, layout: SidebarLayout, view: ExtendedTablesDemo, icon: AppsIcon},
  BubblyReactTablesDemo: {name: `React Tables`, path: `/bubbly/demo/react-tables`, layout: SidebarLayout, view: ReactTablesDemo, icon: AppsIcon},
  BubblyGoogleMapsDemo: {name: `Google Maps`, path: `/bubbly/demo/google-maps`, layout: SidebarLayout, view: GoogleMapsDemo, icon: AppsIcon},
  BubblyFullMapsDemo: {name: `Full Screen Maps`, path: `/bubbly/demo/full-screen-maps`, layout: SidebarLayout, view: FullScreenMapDemo, icon: AppsIcon},
  BubblyVectorMapsDemo: {name: `Vector Maps`, path: `/bubbly/demo/vector-maps`, layout: SidebarLayout, view: VectorMapDemo, icon: AppsIcon},
  BubblyWidgetsDemo: {name: `Widgets`, path: `/bubbly/demo/widgets`, layout: SidebarLayout, view: WidgetsDemo, icon: WidgetsIcon},
  BubblyChartsDemo: {name: `Charts`, path: `/bubbly/demo/charts`, layout: SidebarLayout, view: ChartsDemo, icon: AppsIcon},
  BubblyCalendarDemo: {name: `Calendar`, path: `/bubbly/demo/calendar`, layout: SidebarLayout, view: CalendarDemo, icon: DateRangeIcon},
};

export const Routes: {[key: string]: RouteListItem} = {
  Posts: {name: `Posts`, path: `/bubbly/posts`, layout: SidebarLayout, view: Posts, icon: AppsIcon},
};
