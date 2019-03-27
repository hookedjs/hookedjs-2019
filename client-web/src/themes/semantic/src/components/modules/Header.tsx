import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Button, Modal} from "semantic-ui-react";
import {Logo} from "~/var/config";
import {ContactForm, state as ContactFormState} from "./ContactForm";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {
    background: "#922",
    position: "sticky",
    top: 0,
  },
  rightMenu: {
    float: "right",
  },
});

export type props = WithSheet<typeof style> & {};

export const Header = withSheet(style)(({classes}: props) => {
  return (
    <div className={classes.wrapper}>
      <img src={Logo} height={60} />
      <div className={classes.rightMenu}>
        <Modal
          trigger={<Button>Contact Us</Button>}
          header="Contact Us"
          content={
            <div style={{padding: "20px 20px"}}>
              <ContactForm />
            </div>
          }
          closeIcon={true}
          onOpen={() => (ContactFormState.submitted = false)}
        />
      </div>
    </div>
  );
});
