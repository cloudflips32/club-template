import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const SubmitButton = React.forwardRef(({ className, placeholder, canSubmit, scroll }, ref) => {
  const { toast } = useToast()

  if (canSubmit()) {
    return (
      (
        <><Button
          type="button"
          className={cn(
            "flex w-40 items-center justify-center h-9 rounded-md border border-input mx-auto px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder}
          ref={ref}
          id={"SignUp"}
          disabled={false}
          scroll={"false"}
          onClick={() => {
            toast({
              title: "Input Submitted!",
              description: "Welcome to the Software Engineering Club!",
              action: (
                <ToastAction altText="Chance to undo">
                  Undo
                </ToastAction>
              ),
            })
          }}
        >
          Sign up
        </Button>
        </>
      )
    );
  }
})

export { SubmitButton }