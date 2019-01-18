// ##############################
// // // Notifications view styles
// #############################

import { defaultFont } from "@bubbly/MainStyles";
import { ModalStyle } from "@bubbly/components/modules/Modal/ModalStyle";

export const NotificationsStyle = theme => ({
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    fontSize: "18px"
  },
  cardHeader: {
    zIndex: 3
  },
  cardSubtitle: {
    ...defaultFont,
    color: "#999999",
    fontSize: "14px",
    margin: "0 0 10px"
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
  marginRight: {
    marginRight: "5px"
  },
  modalSectionTitle: {
    marginTop: "30px"
  },
  ...ModalStyle(theme)
});
