// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import WidgetsIcon from "@material-ui/icons/Widgets";
import TimelineIcon from "@material-ui/icons/Timeline";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LockOpenIcon from "@material-ui/icons/LockOpen";

export const HeaderLinks = [
  {path: "/register", name: "Register", short: "Register", mini: "RP", icon: PersonAddIcon},
  {path: "/login", name: "Login", short: "Login", mini: "LP", icon: FingerprintIcon},
  {path: "/lock", name: "Lock Screen", short: "Lock", mini: "LSP", icon: LockOpenIcon}
];

export const SidebarNavLinks = [
  { path: "/admin", name: "Dashboard", icon: DashboardIcon },
  {
    path: "/admin/demo",
    name: "Demo",
    icon: AppsIcon,
    views: [
      { path: "/admin/demo/register", name: "Register", mini: "RE" },
      { path: "/admin/demo/login", name: "Login", mini: "LO" },
      { path: "/admin/demo/lock", name: "Lock", mini: "LK" },
      { path: "/admin/demo/user/profile", name: "User Profile", mini: "UP" },
      { path: "/admin/demo/dashboard", name: "Dashboard", mini: "TP" },
      { path: "/admin/demo/timeline", name: "Timeline", mini: "TP" },
      { path: "/admin/demo/rtl", name: "RTL Support", mini: "RS" },
      { path: "/admin/demo/pricing", name: "Pricing", mini: "PP" },
      { path: "/admin/demo/buttons", name: "Buttons", mini: "B" },
      { path: "/admin/demo/grid-system", name: "Grid System", mini: "GS" },
      { path: "/admin/demo/panels", name: "Panels", mini: "P" },
      { path: "/admin/demo/sweet-alert", name: "Sweet Alert", mini: "SA" },
      { path: "/admin/demo/notifications", name: "Notifications", mini: "N" },
      { path: "/admin/demo/icons", name: "Icons", mini: "I" },
      { path: "/admin/demo/typography", name: "Typography", mini: "T" },
      { path: "/admin/demo/regular-forms", name: "Regular Forms", mini: "RF" },
      {
        path: "/admin/demo/extended-forms",
        name: "Extended Forms",
        mini: "EF"
      },
      {
        path: "/admin/demo/validation-forms",
        name: "Validation Forms",
        mini: "VF"
      },
      { path: "/admin/demo/wizard", name: "Wizard", mini: "W" },
      {
        path: "/admin/demo/regular-tables",
        name: "Regular Tables",
        mini: "RT"
      },
      {
        path: "/admin/demo/extended-tables",
        name: "Extended Tables",
        mini: "ET"
      },
      { path: "/admin/demo/react-tables", name: "React Tables", mini: "RT" },
      { path: "/admin/demo/google-maps", name: "Google Maps", mini: "GM" },
      {
        path: "/admin/demo/full-screen-maps",
        name: "Full Screen Map",
        mini: "FSM"
      },
      { path: "/admin/demo/vector-maps", name: "Vector Map", mini: "VM" },
      { path: "/admin/demo/widgets", name: "Widgets", icon: WidgetsIcon },
      { path: "/admin/demo/charts", name: "Charts", icon: TimelineIcon },
      { path: "/admin/demo/calendar", name: "Calendar", icon: DateRangeIcon }
    ]
  }
];
