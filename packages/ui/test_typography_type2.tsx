import * as React from "react"

export interface DemoProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  ref?: React.Ref<HTMLElement>
}

function Demo({ as = "div", ref, ...props }: DemoProps) {
  const Tag = as as React.ElementType
  return <Tag ref={ref} {...props} />
}
