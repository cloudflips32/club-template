import * as React from 'react';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";

const SubmitButton = React.forwardRef(({ className, canSubmit, handleSubmit }, ref) => {
  return (
    (
      <><Button
        type="submit"
        className={cn(
          "flex w-40 items-center bg-primary justify-center h-9 rounded-md border border-input mx-auto px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:hidden disabled:opacity-50",
          className
        )}
        ref={ref}
        id={"SignUp"}
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Sign up
      </Button>
      </>)
  );
});

export { SubmitButton }