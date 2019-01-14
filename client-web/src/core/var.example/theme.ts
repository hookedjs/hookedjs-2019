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
    path: "/bubbly",
    name: "Demo",
    icon: AppsIcon,
    views: [
      { path: "/bubbly/register", name: "Register", mini: "RE" },
      { path: "/bubbly/login", name: "Login", mini: "LO" },
      { path: "/bubbly/lock", name: "Lock", mini: "LK" },
      { path: "/bubbly/user/profile", name: "User Profile", mini: "UP" },
      { path: "/bubbly/dashboard", name: "Dashboard", mini: "TP" },
      { path: "/bubbly/timeline", name: "Timeline", mini: "TP" },
      { path: "/bubbly/rtl", name: "RTL Support", mini: "RS" },
      { path: "/bubbly/pricing", name: "Pricing", mini: "PP" },
      { path: "/bubbly/buttons", name: "Buttons", mini: "B" },
      { path: "/bubbly/grid-system", name: "Grid System", mini: "GS" },
      { path: "/bubbly/panels", name: "Panels", mini: "P" },
      { path: "/bubbly/sweet-alert", name: "Sweet Alert", mini: "SA" },
      { path: "/bubbly/notifications", name: "Notifications", mini: "N" },
      { path: "/bubbly/icons", name: "Icons", mini: "I" },
      { path: "/bubbly/typography", name: "Typography", mini: "T" },
      { path: "/bubbly/regular-forms", name: "Regular Forms", mini: "RF" },
      {
        path: "/bubbly/extended-forms",
        name: "Extended Forms",
        mini: "EF"
      },
      {
        path: "/bubbly/validation-forms",
        name: "Validation Forms",
        mini: "VF"
      },
      { path: "/bubbly/wizard", name: "Wizard", mini: "W" },
      {
        path: "/bubbly/regular-tables",
        name: "Regular Tables",
        mini: "RT"
      },
      {
        path: "/bubbly/extended-tables",
        name: "Extended Tables",
        mini: "ET"
      },
      { path: "/bubbly/react-tables", name: "React Tables", mini: "RT" },
      { path: "/bubbly/google-maps", name: "Google Maps", mini: "GM" },
      {
        path: "/bubbly/full-screen-maps",
        name: "Full Screen Map",
        mini: "FSM"
      },
      { path: "/bubbly/vector-maps", name: "Vector Map", mini: "VM" },
      { path: "/bubbly/widgets", name: "Widgets", icon: WidgetsIcon },
      { path: "/bubbly/charts", name: "Charts", icon: TimelineIcon },
      { path: "/bubbly/calendar", name: "Calendar", icon: DateRangeIcon }
    ]
  }
];
