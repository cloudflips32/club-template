// EmailField.jsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ErrorWindow } from "../errorWindow";
import { useState } from "react";

const EmailField = React.forwardRef(({ email, setEmail, className, placeholder, changeParentState }, ref) => {
  const [error, setError] = useState({ type: "", description: "" });
  const [isValid, setIsValid] = useState(false);

  const emailRef = React.useRef(null);

  const validateEmail = (text) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(text);

    if (!isValidEmail) {
      setError({ type: "Invalid Email", description: "Please enter a valid email address." });
      setIsValid(false);
      changeParentState(false);
    } else {
      setError({ type: "", description: "" });
      setIsValid(true);
      changeParentState(true);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setEmail(text);
    validateEmail(text);
  };

  const handleInput = () => {
    const text = emailRef.current.value;
    validateEmail(text);
  };

  return (
    <>
      <Input
        type="email"
        id="email"
        value={email}
        ref={emailRef}
        placeholder={placeholder}
        onChange={handleChange}
        onInput={handleInput} // Add this event listener
        className={cn(
          "flex z-10 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
      <ErrorWindow ErrorTitle={error.type} ErrorDescription={error.description} />
    </>
  );
});

export {EmailField};