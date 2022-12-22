import { useDispatch } from "react-redux"
import { FC, useState, useCallback } from "react"
import { login } from "../store/actions"
import { Dispatch } from "../../store"

export const Login: FC = () => {
  const dispatch = useDispatch<Dispatch>()

  const [nickname, setNickname] = useState('')

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login(nickname))
  }, [nickname, dispatch])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }, [setNickname])

  return (
    <form onSubmit={onSubmit}>
      <label>
        Nickname
        <input type="text" onChange={onChange}/>
      </label>

      <button type="submit">Login</button>
    </form>
  )
}