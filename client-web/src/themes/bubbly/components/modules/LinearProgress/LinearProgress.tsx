import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {default as LinearProgressDefault} from "@material-ui/core/LinearProgress";

import { LinearProgressStyle } from "./LinearProgressStyle";

function LinearProgress({ ...props }) {
  const { classes, color, ...rest } = props;
  return (
    <LinearProgressDefault
      {...rest}
      classes={{
        root: classes.root + " " + classes[color + "Background"],
        bar: classes.bar + " " + classes[color]
      }}
    />
  );
}

LinearProgress.defaultProps = {
  color: "gray"
};

LinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};

export default withStyles(LinearProgressStyle)(LinearProgress);
