import { FC } from "react"
import { useSelector } from "react-redux"
import { selectNickname } from "../store/selectors"
import { Login } from "./Login"

export const User: FC = () => {
  const loggedNickname = useSelector(selectNickname)

  return (
    <>
      {
        loggedNickname.length === 0
        ? <Login />
        : <header>Logged User: {loggedNickname}</header>
      }
    </>
  )
}