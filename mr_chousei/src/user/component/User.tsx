import {  FC, ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions';
import { selectNickname } from "../store/selectors"
import { Dispatch } from "../../store"

export const User: FC<{children: ReactElement}> = ({children}) => {
  const loggedNickname = useSelector(selectNickname)

  const dispatch = useDispatch<Dispatch>()
  const onClick = useCallback(() => {
    dispatch(logout())
  }, [])

  return (
    <>
      <header>Logged User: {loggedNickname}</header>

      <button type="button" onClick={onClick}>Logout</button>
      {children}
    </>
  )
}

