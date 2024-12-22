'use client';

import React, {useState} from "react";
import { NameField } from "./Fields/nameField";
import { EmailField } from "./Fields/emailField";
import { SubmitButton } from "./submitButton";
import { ResetButton } from "./resetButton";

const SignUpForm = React.forwardRef((placeHolder, ref) => {
  const [ValidName, setValidName] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [GetSubmitStatus, setSubmitStatus] = useState(false);
  
  function changeNameState(TrueOrFalse) {
    TrueOrFalse === true ? setValidName(true) : setValidName(false);
  }

  function changeEmailState(TrueOrFalse) {
    TrueOrFalse === true ? setValidEmail(true) : setValidEmail(false);
  }

  function compareBoth() {
    let result = false;
    ValidEmail === true && ValidName === true ? result = true : result = false;
    return result;
  }

  // For the reset button!
  function ResetState() {
    setValidName(false);
    setValidEmail(false);
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex flex-col space-y-4">
        <NameField
          changeParentState={changeNameState}
          placeholder="Your Name"
          required
        ></NameField>
        <EmailField
          changeParentState={changeEmailState}
          placeholder="Your Email"
          required
        ></EmailField>
        <div className="flex flex-row space-x-4 mx-auto">
          <SubmitButton 
            canSubmit={compareBoth}
          >
            Submit
          </SubmitButton>
          <ResetButton
            onClick={ResetState}
          >
            Reset
          </ResetButton>
        </div>
      </form>
    </div>
  );
});

export { SignUpForm };
