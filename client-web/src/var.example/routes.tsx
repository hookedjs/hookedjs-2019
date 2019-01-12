import * as React from "react";
import { RouteListItem } from "~/core/Router";

// Layouts
import AuthLayout from "~/theme/current/components/Layouts/Auth/Auth";
import SidebarLayout from "~/theme/current/components/Layouts/Sidebar/Sidebar";
import { LoadingRow } from "~/theme/current/components/Loading/LoadingRow";
import { ErrorRow } from "~/theme/current/components/Error/ErrorRow";

// User Views
const LoginPage = React.lazy(() => import("~/routes/LoginPage"));
const RegisterPage = React.lazy(() => import("~/routes/RegisterPage"));
const LockScreenPage = React.lazy(() => import("~/routes/LockScreenPage"));
const UserProfile = React.lazy(() => import("~/routes/UserProfile"));

// Admin Views
const Dashboard = React.lazy(() => import("~/theme/current/demo/components/Dashboard/Dashboard"));
const Posts = React.lazy(() => import("~/routes/Posts"));

// Demo Views
const LoginPageDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/LoginPage"));
const RegisterPageDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/RegisterPage"));
const LockScreenPageDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/LockScreenPage"));
const UserProfileDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/UserProfile"));
const DashboardDemo = React.lazy(() => import("~/theme/current/demo/components/Dashboard/Dashboard"));
const ButtonsDemo = React.lazy(() => import("~/theme/current/demo/components/Components/Buttons"));
const GridSystemDemo = React.lazy(() => import("~/theme/current/demo/components/Components/GridSystem"));
const PanelsDemo = React.lazy(() => import("~/theme/current/demo/components/Components/Panels"));
const SweetAlertDemo = React.lazy(() => import("~/theme/current/demo/components/Components/SweetAlert"));
const NotificationsDemo = React.lazy(() => import("~/theme/current/demo/components/Components/Notifications"));
const IconsDemo = React.lazy(() => import("~/theme/current/demo/components/Components/Icons"));
const TypographyDemo = React.lazy(() => import("~/theme/current/demo/components/Components/Typography"));
const RegularFormsDemo = React.lazy(() => import("~/theme/current/demo/components/Forms/RegularForms"));
const ExtendedFormsDemo = React.lazy(() => import("~/theme/current/demo/components/Forms/ExtendedForms"));
const ValidationFormsDemo = React.lazy(() => import("~/theme/current/demo/components/Forms/ValidationForms"));
const WizardDemo = React.lazy(() => import("~/theme/current/demo/components/Forms/Wizard"));
const RegularTablesDemo = React.lazy(() => import("~/theme/current/demo/components/Tables/RegularTables"));
const ExtendedTablesDemo = React.lazy(() => import("~/theme/current/demo/components/Tables/ExtendedTables"));
const ReactTablesDemo = React.lazy(() => import("~/theme/current/demo/components/Tables/ReactTables"));
const GoogleMapsDemo = React.lazy(() => import("~/theme/current/demo/components/Maps/GoogleMaps"));
const FullScreenMapDemo = React.lazy(() => import("~/theme/current/demo/components/Maps/FullScreenMap"));
const VectorMapDemo = React.lazy(() => import("~/theme/current/demo/components/Maps/VectorMap"));
const ChartsDemo = React.lazy(() => import("~/theme/current/demo/components/Charts/Charts"));
const CalendarDemo = React.lazy(() => import("~/theme/current/demo/components/Calendar/Calendar"));
const WidgetsDemo = React.lazy(() => import("~/theme/current/demo/components/Widgets/Widgets"));
const TimelinePageDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/Timeline"));
const RTLSupportDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/RTLSupport"));
const PricingPageDemo = React.lazy(() => import("~/theme/current/demo/components/Pages/PricingPage"));

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
  {path: "/admin/demo/register", layout: AuthLayout, view: RegisterPageDemo},
  {path: "/admin/demo/login", layout: AuthLayout, view: LoginPageDemo},
  {path: "/admin/demo/lock", layout: AuthLayout, view: LockScreenPageDemo},
  {path: "/admin/demo/user/profile", layout: SidebarLayout, view: UserProfileDemo},
  {path: "/admin/demo/dashboard", layout: SidebarLayout, view: DashboardDemo},
  {path: "/admin/demo/timeline", layout: SidebarLayout, view: TimelinePageDemo},
  {path: "/admin/demo/rtl", layout: SidebarLayout, view: RTLSupportDemo},
  {path: "/admin/demo/pricing", layout: SidebarLayout, view: PricingPageDemo},
  {path: "/admin/demo/buttons", layout: SidebarLayout, view: ButtonsDemo},
  {path: "/admin/demo/grid-system", layout: SidebarLayout, view: GridSystemDemo},
  {path: "/admin/demo/panels", layout: SidebarLayout, view: PanelsDemo},
  {path: "/admin/demo/sweet-alert", layout: SidebarLayout, view: SweetAlertDemo},
  {path: "/admin/demo/notifications", layout: SidebarLayout, view: NotificationsDemo},
  {path: "/admin/demo/icons", layout: SidebarLayout, view: IconsDemo},
  {path: "/admin/demo/typography", layout: SidebarLayout, view: TypographyDemo},
  {path: "/admin/demo/regular-forms", layout: SidebarLayout, view: RegularFormsDemo},
  {path: "/admin/demo/extended-forms", layout: SidebarLayout, view: ExtendedFormsDemo},
  {path: "/admin/demo/validation-forms", layout: SidebarLayout, view: ValidationFormsDemo},
  {path: "/admin/demo/wizard", layout: SidebarLayout, view: WizardDemo},
  {path: "/admin/demo/regular-tables", layout: SidebarLayout, view: RegularTablesDemo},
  {path: "/admin/demo/extended-tables", layout: SidebarLayout, view: ExtendedTablesDemo},
  {path: "/admin/demo/react-tables", layout: SidebarLayout, view: ReactTablesDemo},
  {path: "/admin/demo/google-maps", layout: SidebarLayout, view: GoogleMapsDemo},
  {path: "/admin/demo/full-screen-maps", layout: SidebarLayout, view: FullScreenMapDemo},
  {path: "/admin/demo/vector-maps", layout: SidebarLayout, view: VectorMapDemo},
  {path: "/admin/demo/widgets", layout: SidebarLayout, view: WidgetsDemo},
  {path: "/admin/demo/charts", layout: SidebarLayout, view: ChartsDemo},
  {path: "/admin/demo/calendar", layout: SidebarLayout, view: CalendarDemo},
];

export const allRoutes: RouteListItem[] = [...appRoutes, ...demoRoutes, ...adminRoutes];

export const LoadingComponent = <LoadingRow />;
export const ErrorComponent = (
  <SidebarLayout>
    <ErrorRow title="404" content="Sorry, the route you requested does not exist" />
  </SidebarLayout>
);
