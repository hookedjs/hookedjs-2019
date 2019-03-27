import React from "react";
import {Button, Icon, Form} from "semantic-ui-react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {observable, observe, set} from "mobx";
import {Observer, useObservable} from "mobx-react-lite";
// import {Axios} from "~/core/data/Axios";
import {LeadProfile} from "../../state/LeadProfile";
import {MobxPersist} from "core/polyfills/MobxPersist";

// Form Data State
export const state = observable({
  name: "",
  email: "",
  message: "",
  submitted: false,
});
MobxPersist("ContactFormState", state);
// Keep form up to date with lead intel
observe(LeadProfile, () => {set(state, {...state, ...LeadProfile})});

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const ContactForm = withSheet(style)(({classes}: props) => {
  const _state = useObservable(state);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update LeadProfile
    set(LeadProfile, {...LeadProfile, ..._state});

    // TODO: post to api
    // Axios.post('/contact', {...})

    _state.submitted = true;
    _state.message = "";
  };

  return (
    <div className={classes.wrapper}>
      <Observer render={() =>
        !_state.submitted ?
          (
            <Form onSubmit={onSubmit}>
              <Form.Field label="Name" control="input" placeholder="name..." value={_state.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (_state.name = e.target.value)}/>
              <Form.Field label="Email" control="input" placeholder="email..." value={_state.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (_state.email = e.target.value)}/>
              <Form.Field label="Message" control="textarea" placeholder="message..." value={_state.message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (_state.message = e.target.value)}/>
              <Button type="submit" color="green">
                <Icon name="checkmark"/> Submit
              </Button>
            </Form>
          )
          : (
            <p>
              Got it, Thanks!
            </p>
          )
      }/>
    </div>
  );
});
