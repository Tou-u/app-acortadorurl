import type { NextComponentType, NextPageContext } from "next"

interface Props {}

const Header: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  return (
    <div>
      <h1>From Header</h1>
    </div>
  )
}

export default Header
