import * as React from "react"
import { cn } from "@/lib/utils"

const ErrorWindow = React.forwardRef(({ ErrorTitle, ErrorDescription }, ref) => {
  if (ErrorTitle.length > 0) {
    return (
      (
        <div className={cn("flex flex-col bg-gray-500 border-4 border-rose-500/100 border-radius: 15px text-red-700 px-4 py-3 mt-4 rounded relative")} role="alert">
          <strong className={cn("font-bold")}>{ErrorTitle}</strong>
          <span className={cn("block:inline")}>{ErrorDescription}</span>
          <span className={cn("absolute top-0 bottom-0 right-0 px-4 py-3")}>
          </span>
        </div>
      )
    );
  }
})

export { ErrorWindow }