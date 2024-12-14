import * as React from "react"

import { cn } from "@/lib/utils"
import { ErrorWindow } from "../errorWindow";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NameField = React.forwardRef(({ className, placeholder, changeParentState }, ref) => {
  const [errorType, setErrorType] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  function validateText(text) {
    /*Only text, does not contain
     *  any numbers
     * special characters, ie: ! @ #"
     */
    let count = 0;
    let containsNonvalidChar = false;
    let keepGoing = true;
    while (containsNonvalidChar == false && keepGoing == true) {
      if (parseInt(text[count]) >= 0 || text.length == 0) {
        containsNonvalidChar = true;
      }
      else {
        switch (text[count]) {
          case "`":
          case "~":
          case "!":
          case "@":
          case "#":
          case "$":
          case "%":
          case "^":
          case "&":
          case "*":
          case "(":
          case ")":
          case "-":
          case "_":
          case "+":
          case "=":
          case "{":
          case "[":
          case "}":
          case "]":
          case "\\":
          case "|":
          case ":":
          case ";":
          case '"':
          case "'":
          case "?":
          case "/":
          case ">":
          case "<":
          case ",":
          case ".":
            containsNonvalidChar = true;
        }
      }
      if (count > text.length) {
        keepGoing = false;
      }
      count++;
    }
    if (containsNonvalidChar) {
      if (text.length > 0) {
        setErrorType("Invalid character")
        setErrorDescription("You have a character in your name thats invalid, may want to fix that.")
        changeParentState(false);
      }
      else {
        setErrorType("Required");
        setErrorDescription("Your name is required");
        changeParentState(false);
      }
    }
    else {
      setErrorType("")
      setErrorDescription("");
      changeParentState(true);
    }
  }
  function handleChange(e) {
    let text = e.target.value;
    validateText(text);
  }
  return (
    <>
      <input
        type="text"
        id="name-field"
        className={cn(
          "flex z-10 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <ErrorWindow
        ErrorTitle={errorType}
        ErrorDescription={errorDescription}
      />
    </>
  );
})

export { NameField }