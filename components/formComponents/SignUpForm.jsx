'use client';

import React, {useState} from "react";
import { NameField } from "./Fields/nameField";
import { EmailField } from "./Fields/emailField";
import { SubmitButton } from "./submitButton";
import { ResetButton } from "./resetButton";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';

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

  async function handleSubmit(e, name, email) {
    try {
      e.preventDefault();
      const docRef = doc(db, 'members', email);
      const currentTime = new Date().toISOString();
      const role = 'member';

      await setDoc(docRef, { name, email, role, joined: currentTime });
      // Reset form fields
      ResetState()
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex flex-col space-y-4" onSubmit={(e) => {
        if (compareBoth()) {
          handleSubmit(e.target.name.value, e.target.email.value);
        }
      }}>
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
