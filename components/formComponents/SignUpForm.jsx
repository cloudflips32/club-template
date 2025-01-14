'use client';

import React, { useState, useEffect } from "react";
import { NameField } from "./Fields/nameField";
import { EmailField } from "./Fields/emailField";
import { SubmitButton } from "./submitButton";
import { ResetButton } from "./resetButton";
import { db } from "@/app/config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast";
import { Image } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const { toast } = useToast();

  const changeParentState = (isValid, type) => {
    if (type === 'name') {
      setNameValid(isValid);
    } else if (type === 'email') {
      setEmailValid(isValid);
    }

    if (nameValid && emailValid) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  useEffect(() => {
    if (nameValid && emailValid) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [nameValid, emailValid]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (canSubmit) {
      try {
        const docRef = await addDoc(collection(db, "members"), {
          name: name,
          email: email,
          role: "Member",
          joined: new Date().toISOString(),
        });

        toast({
          title: "Sent!",
          description: "Welcome to the Software Engineering club.",
          action: <ToastAction altText="undo">Undo</ToastAction>,
        });
        setName("");
        setEmail("");
        setNameValid(false);
        setEmailValid(false);
        setCanSubmit(false);

      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <NameField
          name={name}
          setName={setName}
          changeParentState={(isValid) => changeParentState(isValid, 'name')}
          placeholder="Your Name"
          required
        />
        <EmailField
          email={email}
          setEmail={setEmail}
          changeParentState={(isValid) => changeParentState(isValid, 'email')}
          placeholder="Your Email"
          required
        />
        <div className="flex flex-row space-x-4 mx-auto">
          <SubmitButton
            canSubmit={canSubmit}
            handleSubmit={handleSubmit}
            >
            Submit
          </SubmitButton>
          <ResetButton
            setName={setName}
            setEmail={setEmail}
          >
            Reset
          </ResetButton>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;