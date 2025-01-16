// NameField.jsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ErrorWindow } from "../errorWindow";
import { Input } from "@/components/ui/input";

const NameField = React.forwardRef(({ name, setName, changeParentState, className }, ref) => {
  const [error, setError] = useState({ type: "", description: "" });

  const validateText = (text) => {
    const invalidChars = /[^a-zA-Z ]/;
    if (invalidChars.test(text)) {
      setError({ type: "Invalid character", description: "Your name contains invalid characters." });
      changeParentState(false);
    } else if (text.length === 0) {
      setError({ type: "Required", description: "Your name is required." });
      changeParentState(false);
    } else {
      setError({ type: "", description: "" });
      changeParentState(true);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    validateText(text);
    setName(text);
  };

  return (
    <div>
      <Input
        type="text"
        id="name"
        value={name}
        ref={ref}
        maxLength="20"
        onChange={handleChange}
        className={cn(
          "flex z-10 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder="Your Name"
        required
      />
      <ErrorWindow ErrorTitle={error.type} ErrorDescription={error.description} />
    </div>
  );
});

export { NameField };