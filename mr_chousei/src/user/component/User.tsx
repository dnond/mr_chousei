import { FC, ReactElement } from "react"
import { useSelector } from "react-redux"
import { selectNickname } from "../store/selectors"
import { Login } from "./Login"

export const User: FC<{children: ReactElement}> = ({children}) => {
  const loggedNickname = useSelector(selectNickname)

  return (
    <>
      <header>Logged User: {loggedNickname}</header>
      {children}
    </>
  )
}

