import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";

const ResetButton = React.forwardRef(({ className, scroll }, ref) => {
    return (
      (
        <><Button
            className={cn(
            "flex h-9 w-40 rounded-md border border-input mx-auto bg-red-500 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            ref={ref}
            type="reset"
            value="Reset"
            scroll={scroll}
          >
            Reset
          </Button>
        </>
      )
    );
  }
)

export { ResetButton }
