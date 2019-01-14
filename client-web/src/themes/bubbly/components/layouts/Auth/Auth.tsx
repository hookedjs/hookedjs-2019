import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PageHeader from "~/themes/bubbly/components/sections/Header/PageHeader";
import Footer from "~/themes/bubbly/components/sections/Footer/Footer";

import { AuthStyle } from "./AuthStyle";

import bgImage from "~/themes/bubbly/components/demo/assets/img/register.jpeg";

import { HeaderLinks } from "~/var/routing";

class Auth extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PageHeader {...rest} links={HeaderLinks} />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            {this.props.children}
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AuthStyle)(Auth);
