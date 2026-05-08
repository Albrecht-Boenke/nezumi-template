import * as React from "react"

type Test = keyof React.JSX.IntrinsicElements
const x: Test = "div"

export interface DemoProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements
  ref?: React.Ref<HTMLElement>
}

function Demo({ as = "div", ref, ...props }: DemoProps) {
  const Tag = as
  return <Tag ref={ref} {...props} />
}
