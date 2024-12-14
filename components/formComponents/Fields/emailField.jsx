import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { ErrorWindow } from "../errorWindow";
import { useState } from "react";

const EmailField = React.forwardRef(({ className, placeholder, changeParentState }, ref) => {
  const [errorType, setErrorType] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  function checkInvalidCharacters(text) {
    /*, Less strict than name, whats allowed should be:
    special characters: ! _ =  except @ 
    One @ symbol: @gmail.com
    */
    let count = 0;
    let containsNonvalidChar = false;
    let keepGoing = true;
    let atSymbolCount = 0;
    while (containsNonvalidChar == false && keepGoing == true) {
      if (text[count] == "@") {
        atSymbolCount++
      }
      if (text.length == 0) {
        containsNonvalidChar = true;
      }
      else {
        //source for email list, this is before the @ sign 
        //https://ladedu.com/valid-characters-for-email-addresses-the-complete-list/#Characters-Special-Characters-and-Symbols-Allowed-in-an-Email-Address
        switch (text[count]) {
          case "&":
          case "(":
          case ")":
          case "[":
          case "]":
          case "\\":
          case ":":
          case ";":
          case '"':
          case ">":
          case "<":
          case ",":
            containsNonvalidChar = true;
        }
      }
      if (count > text.length) {
        keepGoing = false;
      }
      if (atSymbolCount > 1) {
        containsNonvalidChar = true;
      }
      count++;
    }
    if (containsNonvalidChar) {
      setErrorType('Invalid character.');
      setErrorDescription("Invalid character in your email.");
      changeParentState(false);
    }
    if (atSymbolCount > 1) {
      setErrorType("Too many @'s");
      setErrorDescription("You have too many error symbols, please consider removing one.");
      changeParentState(false);
      containsNonvalidChar = true;
    }
    if (atSymbolCount < 1) {
      setErrorType("Required: @");
      setErrorDescription("Your email requires a @");
      changeParentState(false);
      containsNonvalidChar = true;
    }
    return containsNonvalidChar;
  }
  function checkValidName(text) {
    let valid = false;
    switch (text.toLowerCase()) {
      case "a":
      case "b":
      case "c":
      case "d":
      case "e":
      case "f":
      case "g":
      case "h":
      case "i":
      case "j":
      case "k":
      case "l":
      case "m":
      case "n":
      case "o":
      case "p":
      case "q":
      case "r":
      case "s":
      case "t":
      case "u":
      case "v":
      case "w":
      case "x":
      case "y":
      case "z":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
      case "?":
      case "!":
      case "{":
      case "}":
      case "~":
      case "-":
      case "_":
      case "+":
      case "/":
      case "=":
      case "%":
      case "$":
      case "#":
      case "'":
      case "`":
      case "|":
      case "^":
      case "*":
        valid = true;
        break;
      default:
        valid = false;
        break;
    }
    return valid;
  }
  function validateText(text) {
    if (text.length >= 4) {
      let result = checkInvalidCharacters(text);
      if (result == false) {
        //source for email list, this is before the @ sign 
        //https://ladedu.com/valid-characters-for-email-addresses-the-complete-list/#Characters-Special-Characters-and-Symbols-Allowed-in-an-Email-Address
        let test = text.split("@");
        let count = 0;
        let element = test[0];
        do {
          result = checkValidName(element[count]);
          count++;
        } while (result === true && count < text[0].length);
        if (result == true) {
          setErrorDescription("");
          setErrorType("");
          changeParentState(true);
        }
        else {
          setErrorDescription("Invalid Email Name, please check your email.");
          setErrorType("Invalid Email Name");
          changeParentState(false);
        }
      }
    }
    else {
      setErrorType("Length")
      setErrorDescription("Please type out the rest of the email, or try another email");
      changeParentState(false);
    }
  }
  function handleChange(e) {
    let text = e.target.value;
    validateText(text);
  }
  return (
    (<>
      <input
        type="email"
        id="email-field"
        className={cn(
          "container flex z-10 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
    </>)
  );
})

export { EmailField }