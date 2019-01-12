import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";

// core components
import HeaderLinks from "~/theme/current/components/Header/HeaderLinks";

import { SidebarStyle } from "./SidebarStyle";

import avatar from "~/theme/current/demo/assets/img/faces/avatar.jpg";

let ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
const SidebarWrapper = ({ className, userJsx, headerLinksJsx, linksJsx }) => {
  const sidebarWrapperRef = React.createRef();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapperRef, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div className={className} ref={sidebarWrapperRef}>
      {userJsx}
      {headerLinksJsx}
      {linksJsx}
    </div>
  );
};

// TODO: Add typescript to honor proptypes
/*
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object)
};
 */

const Sidebar = ({
  classes,
  bgColor,
  rtlActive,
  color,
  logo,
  logoText,
  image,
  links,
  handleDrawerToggle,
  open,
  miniActive
}) => {
  if (!bgColor) bgColor = "blue";
  const mainPanel = React.createRef();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  // TODO: Menu states should be stored in Mobx
  const [menuStates, setMenuStates] = React.useState({
    openAvatar: false,
    miniActive: false
  });

  const openCollapse = collapse => {
    let st = menuStates;
    st[collapse] = !st[collapse];
    setMenuStates(st);
  };

  const itemText =
    classes.itemText +
    " " +
    cx({
      [classes.itemTextMini]: miniActive && menuStates.miniActive,
      [classes.itemTextMiniRTL]:
        rtlActive && miniActive && menuStates.miniActive,
      [classes.itemTextRTL]: rtlActive
    });
  const collapseItemText =
    classes.collapseItemText +
    " " +
    cx({
      [classes.collapseItemTextMini]: miniActive && menuStates.miniActive,
      [classes.collapseItemTextMiniRTL]:
        rtlActive && miniActive && menuStates.miniActive,
      [classes.collapseItemTextRTL]: rtlActive
    });
  const userWrapperClass =
    classes.user +
    " " +
    cx({
      [classes.whiteAfter]: bgColor === "white"
    });
  const caret =
    classes.caret +
    " " +
    cx({
      [classes.caretRTL]: rtlActive
    });
  const collapseItemMini =
    classes.collapseItemMini +
    " " +
    cx({
      [classes.collapseItemMiniRTL]: rtlActive
    });
  const photo =
    classes.photo +
    " " +
    cx({
      [classes.photoRTL]: rtlActive
    });
  const userJsx = (
    <div className={userWrapperClass}>
      <div className={photo}>
        <img src={avatar} className={classes.avatarImg} alt="..." />
      </div>
      <List className={classes.list}>
        <ListItem className={classes.item + " " + classes.userItem}>
          <NavLink
            to={"#"}
            className={classes.itemLink + " " + classes.userCollapseButton}
            onClick={() => openCollapse("openAvatar")}
          >
            <ListItemText
              primary={rtlActive ? "تانيا أندرو" : "Tania Andrew"}
              secondary={
                <b
                  className={
                    caret +
                    " " +
                    classes.userCaret +
                    " " +
                    (menuStates.openAvatar ? classes.caretActive : "")
                  }
                />
              }
              disableTypography={true}
              className={itemText + " " + classes.userItemText}
            />
          </NavLink>
          <Collapse in={menuStates.openAvatar} unmountOnExit>
            <List className={classes.list + " " + classes.collapseList}>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="#"
                  className={
                    classes.itemLink +
                    " " +
                    classes.userCollapseLinks +
                    " " +
                    cx({
                      [" " + classes.collapseActive]: activeRoute(
                        "/user/profile"
                      )
                    })
                  }
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "مع" : "MP"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "ملفي" : "My Profile"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="/user/profile/edit"
                  className={
                    classes.itemLink +
                    " " +
                    classes.userCollapseLinks +
                    " " +
                    cx({
                      [" " + classes.collapseActive]: activeRoute(
                        "/user/profile/edit"
                      )
                    })
                  }
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "هوع" : "EP"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "تعديل الملف الشخصي" : "Edit Profile"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="#"
                  className={
                    classes.itemLink +
                    " " +
                    classes.userCollapseLinks +
                    " " +
                    cx({
                      [" " + classes.collapseActive]: activeRoute(
                        "/user/settings"
                      )
                    })
                  }
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "و" : "S"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "إعدادات" : "Settings"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </div>
  );
  const linksJsx = (
    <List className={classes.list}>
      {links.map((route, routeIndex) => {
        if (route.redirect || route.hideInMenu) {
          return null;
        }
        if (route.views && route.views.length) {
          const navLinkClasses =
            classes.itemLink +
            " " +
            cx({
              [" " + classes.collapseActive]: activeRoute(route.path)
            });
          const itemText =
            classes.itemText +
            " " +
            cx({
              [classes.itemTextMini]: miniActive && menuStates.miniActive,
              [classes.itemTextMiniRTL]:
                rtlActive && miniActive && menuStates.miniActive,
              [classes.itemTextRTL]: rtlActive
            });
          const collapseItemText =
            classes.collapseItemText +
            " " +
            cx({
              [classes.collapseItemTextMini]:
                miniActive && menuStates.miniActive,
              [classes.collapseItemTextMiniRTL]:
                rtlActive && miniActive && menuStates.miniActive,
              [classes.collapseItemTextRTL]: rtlActive
            });
          const itemIcon =
            classes.itemIcon +
            " " +
            cx({
              [classes.itemIconRTL]: rtlActive
            });
          const caret =
            classes.caret +
            " " +
            cx({
              [classes.caretRTL]: rtlActive
            });
          return (
            <ListItem key={routeIndex} className={classes.item}>
              <NavLink
                to={"#"}
                className={navLinkClasses}
                onClick={() => openCollapse(routeIndex)}
              >
                <ListItemIcon className={itemIcon}>
                  {typeof route.icon === "string" ? (
                    <Icon>{route.icon}</Icon>
                  ) : (
                    <route.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  secondary={
                    <b
                      className={
                        caret +
                        " " +
                        (menuStates[routeIndex] ? classes.caretActive : "")
                      }
                    />
                  }
                  disableTypography={true}
                  className={itemText}
                />
              </NavLink>
              <Collapse in={menuStates[routeIndex]} unmountOnExit>
                <List className={classes.list + " " + classes.collapseList}>
                  {route.views.map((route, routeIndex) => {
                    if (route.redirect) {
                      return null;
                    }
                    const navLinkClasses =
                      classes.collapseItemLink +
                      " " +
                      cx({
                        [" " + classes[color]]: activeRoute(route.path)
                      });
                    const collapseItemMini =
                      classes.collapseItemMini +
                      " " +
                      cx({
                        [classes.collapseItemMiniRTL]: rtlActive
                      });
                    return (
                      <ListItem
                        key={routeIndex}
                        className={classes.collapseItem}
                      >
                        <NavLink to={route.path} className={navLinkClasses}>
                          <span className={collapseItemMini}>{route.mini}</span>
                          <ListItemText
                            primary={route.name}
                            disableTypography={true}
                            className={collapseItemText}
                          />
                        </NavLink>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </ListItem>
          );
        }
        const navLinkClasses =
          classes.itemLink +
          " " +
          cx({
            [" " + classes[color]]: activeRoute(route.path)
          });
        const itemText =
          classes.itemText +
          " " +
          cx({
            [classes.itemTextMini]: miniActive && menuStates.miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && miniActive && menuStates.miniActive,
            [classes.itemTextRTL]: rtlActive
          });
        const itemIcon =
          classes.itemIcon +
          " " +
          cx({
            [classes.itemIconRTL]: rtlActive
          });
        return (
          <ListItem key={routeIndex} className={classes.item}>
            <NavLink to={route.path} className={navLinkClasses}>
              <ListItemIcon className={itemIcon}>
                {typeof route.icon === "string" ? (
                  <Icon>{route.icon}</Icon>
                ) : (
                  <route.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={route.name}
                disableTypography={true}
                className={itemText}
              />
            </NavLink>
          </ListItem>
        );
      })}
    </List>
  );

  const logoNormal =
    classes.logoNormal +
    " " +
    cx({
      [classes.logoNormalSidebarMini]: miniActive && menuStates.miniActive,
      [classes.logoNormalSidebarMiniRTL]:
        rtlActive && miniActive && menuStates.miniActive,
      [classes.logoNormalRTL]: rtlActive
    });
  const logoMini =
    classes.logoMini +
    " " +
    cx({
      [classes.logoMiniRTL]: rtlActive
    });
  const logoClasses =
    classes.logo +
    " " +
    cx({
      [classes.whiteAfter]: bgColor === "white"
    });
  const brandJsx = (
    <div className={logoClasses}>
      <Link to="/" className={logoMini}>
        <img src={logo} alt="logo" className={classes.img} />
      </Link>
      <Link to="/" className={logoNormal}>
        {logoText}
      </Link>
    </div>
  );
  const drawerPaper =
    classes.drawerPaper +
    " " +
    cx({
      [classes.drawerPaperMini]: miniActive && menuStates.miniActive,
      [classes.drawerPaperRTL]: rtlActive
    });
  const sidebarWrapper =
    classes.sidebarWrapper +
    " " +
    cx({
      [classes.drawerPaperMini]: miniActive && menuStates.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={rtlActive ? "left" : "right"}
          open={open}
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"]
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brandJsx}
          <SidebarWrapper
            className={sidebarWrapper}
            userJsx={userJsx}
            headerLinks={<HeaderLinks rtlActive={rtlActive} />}
            linksJsx={linksJsx}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          onMouseOver={() =>
            setMenuStates({ ...menuStates, miniActive: false })
          }
          onMouseOut={() => setMenuStates({ ...menuStates, miniActive: true })}
          anchor={rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"]
          }}
        >
          {brandJsx}
          <SidebarWrapper
            className={sidebarWrapper}
            userJsx={userJsx}
            linksJsx={linksJsx}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withStyles(SidebarStyle)(Sidebar);
