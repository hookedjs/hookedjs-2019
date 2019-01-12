import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "~/theme/current/components/Header/Header";
import Footer from "~/theme/current/components/Footer/Footer";
import SidebarComponent from "~/theme/current/components/Sidebar/Sidebar";

import { SidebarNavLinks } from "~/var/theme";

import { SidebarStyle } from "./SidebarStyle";
import { SidebarStyleRtl } from "./SidebarStyleRtl";

import image from "~/theme/current/demo/assets/img/sidebar-2.jpg";
import logo from "~/theme/current/demo/assets/img/logo-white.svg";

let ps;
let rtlActive = window.location.href.includes("rtl");

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      rtlActive: rtlActive
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    // if (e.history.location.pathname !== e.location.pathname) {
    //   this.refs.mainPanel.scrollTop = 0;
    //   if (this.state.mobileOpen) {
    //     this.setState({ mobileOpen: false });
    //   }
    // }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <SidebarComponent
          links={SidebarNavLinks}
          logoText={"React Demo"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          rtlActive={this.state.rtlActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            links={SidebarNavLinks}
            handleDrawerToggle={this.handleDrawerToggle}
            rtlActive={this.state.rtlActive}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{this.props.children}</div>
          </div>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(rtlActive ? SidebarStyleRtl : SidebarStyle)(Sidebar);
