"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from "../../lib/utils"

function InputOTP({ className, containerClassName, ref, ...props }: React.ComponentProps<typeof OTPInput>) {
  return (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-8 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
}

function InputOTPSlot({ index, className, ...props }: { index: number } & React.ComponentProps<"div">) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slot = inputOTPContext?.slots[index]
  const char = slot?.char
  const hasFakeCaret = slot?.hasFakeCaret
  const isActive = slot?.isActive

  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "relative flex h-40 w-40 items-center justify-center border-y border-r border-border text-[0.875rem] text-text",
        "first:rounded-l-md first:border-l last:rounded-r-md",
        "transition-all duration-fast",
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-px animate-pulse bg-text" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div role="separator" data-slot="input-otp-separator" {...props}>
      <svg viewBox="0 0 8 8" fill="currentColor" className="h-8 w-8 text-text-muted">
        <circle cx="4" cy="4" r="1" />
      </svg>
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
