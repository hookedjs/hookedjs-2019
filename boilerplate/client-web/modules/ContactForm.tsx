import React from "react";
import { Box, Button } from "rebass";
import { observable, reaction, set, toJS } from "mobx";
import { observer, useObservable } from "mobx-react-lite";
import {isEmail, normalizeEmail} from "validator";
import { MobxPersist } from "hookedjs/client-web/polyfills/MobxPersist";
import { SuccessIcon } from "../primitives/SuccessIcon";
import { LeadProfile } from "../state/LeadProfile";
import { Loading } from "./Loading";

export const state = observable({
  form: {
    name: "",
    email: "",
    message: ""
  },
  submitted: false,
  loading: false,
  errors: [],
  errorMessage: "",
});
MobxPersist("ContactFormState", state).then(() => {
  // Keep form up to date with lead intel
  set(state.form, { ...state.form, name: LeadProfile.name, email: LeadProfile.email });
  reaction(() => toJS(LeadProfile), () => {
    set(state.form, { ...state.form, name: LeadProfile.name, email: LeadProfile.email });
  });
});

export type props = {};

export const ContactForm = observer(({}: props) => {
  const _state = useObservable(state);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    set(_state, { ..._state, errors: [], errorMessage: "", loading: true });

    // Cheap validation TODO: Implement full validation
    const optionalFields: string[] = [];
    let errors = Object.entries(_state.form)
      .filter(([key, value]) => !value && !optionalFields.includes(key))
      .map(([key, value]) => key);
    if (!isEmail(_state.form.email)) errors.push("email");
    if (errors.length) {
      set(_state, {
        ..._state,
        loading: false,
        errors: errors,
        errorMessage: "Please correct the highlighted fields above.",
      });
      return;
    }

    set(_state.form, { ..._state.form, email: normalizeEmail(_state.form.email), });


    // Update LeadProfile
    set(LeadProfile, { ...LeadProfile, name: _state.form.name, email: _state.form.email });

    // TODO: post to api
    // Axios.post("/feedback", _state.form)
    //   .then(function(response) {
    //     set(_state, {
    //       submitted: true,
    //       loading: false,
    //       form: {
    //         ..._state.form,
    //         message: "",
    //         reason: "",
    //       },
    //     });
    //   })
    //   .catch(function(error) {
    //     set(_state, {
    //       loading: false,
    //       errorMessage: `Error: ${JSON.stringify(error.response.data.message, null, '\t')}`,
    //     });
    //   });

    set(_state, {
      submitted: true,
      loading: false,
      form: {
        ..._state.form,
        message: "",
      }
    });
  };

  return (
    <Box>
      <Box className="header">
        <h3>Get Help</h3>
        <p>Have a question? Fill out the form below to let us know how we can help.</p>
      </Box>
      <Box className="body">
        {_state.loading && (
          <Box className="success-message">
            <Loading/>
            <p>Feedback received. Thanks!</p>
          </Box>
        )}
        {_state.submitted && (
          <Box className="success-message">
            <SuccessIcon/>
            <p>Feedback received. Thanks!</p>
          </Box>
        )}
        {!_state.submitted && !_state.loading && (
          <form onSubmit={onSubmit}>
            <label>Name *</label>
            <input
              type="text"
              placeholder="Your Name"
              value={_state.form.name}
              onChange={(e) => (_state.form.name = e.target.value)}
              // error={_state.errors.includes("name") && !_state.form.name}
            />
            <label>Email *</label>
            <input
              type="text"
              placeholder="Email Address"
              value={_state.form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement & {value: string}>) => (_state.form.email = e.target.value)}
              // error={_state.errors.includes("email") && !EmailAddressRe.test(_state.form.email)}
            />
            <label>Message *</label>
            <input
              type="textarea"
              placeholder="Write your message here"
              value={_state.form.message}
              onChange={(e) => (_state.form.message = e.target.value)}
              // error={_state.errors.includes("message") && !_state.form.message}
            />

            {_state.errorMessage && (
              <div style={{color: "red"}}>
                <pre>{_state.errorMessage}</pre>
              </div>
            )}

            <Button
              disabled={_state.loading}
              onClick={onSubmit}
            >
              {_state.loading ? "Sending..." : "Submit Message"}
            </Button>
          </form>
        )}
      </Box>
      <Box className="footer">
        <p>
          <a href="#" target="_blank">
            Privacy Policy
          </a>
        </p>
      </Box>

      {/*<style jsx>{`
        .header {
          border-bottom: 1px solid #ccc;
        }
        .header p {
          margin: auto;
          max-width: 300px;
        }
        .footer {
          border-top: 1px solid #ccc;
        }
      `}</style>*/}
    </Box>
  );
});
