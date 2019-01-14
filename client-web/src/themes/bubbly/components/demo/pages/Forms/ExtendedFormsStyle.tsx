// ##############################
// // // ExtendedForms view styles
// #############################

import { cardTitle } from "~/themes/bubbly/MainStyles";
import { CustomSelectStyle } from "~/themes/bubbly/components/modules/Form/CustomSelectStyle";
import { CustomCheckboxRadioSwitchStyle } from "~/themes/bubbly/components/modules/Form/CustomCheckboxRadioSwitchStyle";

export const ExtendedFormsStyle = {
  ...CustomCheckboxRadioSwitchStyle,
  ...CustomSelectStyle,
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
  mrAuto: {
    marginRight: "auto"
  },
  mlAuto: {
    marginLeft: "auto"
  }
};
