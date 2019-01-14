import * as React from "react";
import { RouteListItem } from "~/core/Router";

// Layouts
import AuthLayout from "~/themes/bubbly/components/modules/Layouts/Auth/Auth";
import SidebarLayout from "~/themes/bubbly/components/modules/Layouts/Sidebar/Sidebar";
import { LoadingRow } from "~/themes/bubbly/components/modules/Loading/LoadingRow";
import { ErrorRow } from "~/themes/bubbly/components/modules/Error/ErrorRow";

// User Views
const LoginPage = React.lazy(() => import("~/routes/LoginPage"));
const RegisterPage = React.lazy(() => import("~/routes/RegisterPage"));
const LockScreenPage = React.lazy(() => import("~/routes/LockScreenPage"));
const UserProfile = React.lazy(() => import("~/routes/UserProfile"));

// Admin Views
const Dashboard = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Dashboard/Dashboard"));
const Posts = React.lazy(() => import("~/themes/bubbly/components/pages/Posts/Posts"));

// Demo Views
const LoginPageDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Login/Login"));
const RegisterPageDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Register/Register"));
const LockScreenPageDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Lock/Lock"));
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
const TimelinePageDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Timeline/Timeline"));
const RTLSupportDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/RTLSupport/RTLSupport"));
const PricingPageDemo = React.lazy(() => import("~/themes/bubbly/components/demo/pages/Pricing/Pricing"));

export const appRoutes: RouteListItem[] = [
  {path: "/register", layout: AuthLayout, view: RegisterPage},
  {path: "/login", layout: AuthLayout, view: LoginPage},
  {path: "/lock", layout: AuthLayout, view: LockScreenPage},
  {path: "/register", layout: AuthLayout, view: RegisterPage},
  {path: "/user/profile/edit", layout: SidebarLayout, view: UserProfile},
  {path: "/posts", layout: SidebarLayout, view: Posts},
];

export const adminRoutes: RouteListItem[] = [{path: "/admin", layout: SidebarLayout, view: Dashboard}];

export const demoRoutes: RouteListItem[] = [
  {path: "/bubbly/register", layout: AuthLayout, view: RegisterPageDemo},
  {path: "/bubbly/login", layout: AuthLayout, view: LoginPageDemo},
  {path: "/bubbly/lock", layout: AuthLayout, view: LockScreenPageDemo},
  {path: "/bubbly/user/profile", layout: SidebarLayout, view: UserProfileDemo},
  {path: "/bubbly/dashboard", layout: SidebarLayout, view: DashboardDemo},
  {path: "/bubbly/timeline", layout: SidebarLayout, view: TimelinePageDemo},
  {path: "/bubbly/rtl", layout: SidebarLayout, view: RTLSupportDemo},
  {path: "/bubbly/pricing", layout: SidebarLayout, view: PricingPageDemo},
  {path: "/bubbly/buttons", layout: SidebarLayout, view: ButtonsDemo},
  {path: "/bubbly/grid-system", layout: SidebarLayout, view: GridSystemDemo},
  {path: "/bubbly/panels", layout: SidebarLayout, view: PanelsDemo},
  {path: "/bubbly/sweet-alert", layout: SidebarLayout, view: SweetAlertDemo},
  {path: "/bubbly/notifications", layout: SidebarLayout, view: NotificationsDemo},
  {path: "/bubbly/icons", layout: SidebarLayout, view: IconsDemo},
  {path: "/bubbly/typography", layout: SidebarLayout, view: TypographyDemo},
  {path: "/bubbly/regular-forms", layout: SidebarLayout, view: RegularFormsDemo},
  {path: "/bubbly/extended-forms", layout: SidebarLayout, view: ExtendedFormsDemo},
  {path: "/bubbly/validation-forms", layout: SidebarLayout, view: ValidationFormsDemo},
  {path: "/bubbly/wizard", layout: SidebarLayout, view: WizardDemo},
  {path: "/bubbly/regular-tables", layout: SidebarLayout, view: RegularTablesDemo},
  {path: "/bubbly/extended-tables", layout: SidebarLayout, view: ExtendedTablesDemo},
  {path: "/bubbly/react-tables", layout: SidebarLayout, view: ReactTablesDemo},
  {path: "/bubbly/google-maps", layout: SidebarLayout, view: GoogleMapsDemo},
  {path: "/bubbly/full-screen-maps", layout: SidebarLayout, view: FullScreenMapDemo},
  {path: "/bubbly/vector-maps", layout: SidebarLayout, view: VectorMapDemo},
  {path: "/bubbly/widgets", layout: SidebarLayout, view: WidgetsDemo},
  {path: "/bubbly/charts", layout: SidebarLayout, view: ChartsDemo},
  {path: "/bubbly/calendar", layout: SidebarLayout, view: CalendarDemo},
];

export const allRoutes: RouteListItem[] = [...appRoutes, ...demoRoutes, ...adminRoutes];

export const LoadingComponent = <LoadingRow />;
export const ErrorComponent = (
  <SidebarLayout>
    <ErrorRow title="404" content="Sorry, the route you requested does not exist" />
  </SidebarLayout>
);
