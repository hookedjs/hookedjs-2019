// ##############################
// // // SweetAlert view styles
// #############################

import { ButtonStyle } from "~/theme/current/components/CustomButtons/ButtonStyle";

export const SweetAlertStyle = {
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    fontSize: "18px"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  ...ButtonStyle
};
