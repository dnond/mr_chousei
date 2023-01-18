import { FC, useEffect } from "react"
import { User } from "./user/component/User"
import { EventSchedulesList } from "./event/schedule/component/EventScheduleList"
import { UserRepository } from "./user/core/repository"
import { createUserPresenter } from "./user/core/presenter"
import { createStore } from "./store"
import { Provider } from "react-redux"
import { EventScheduleRepository } from "./event/schedule/core/repository"
import { createEventSchedulesPresenter } from "./event/schedule/core/presenter"
import { MemoryRouter, Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNickname } from "./user/store/selectors"
import { Login } from "./user/component/Login"

const userPresenter = createUserPresenter()
const eventSchedulePresenter = createEventSchedulesPresenter()

export const App: FC<{userRepository: UserRepository, eventScheduleRepository: EventScheduleRepository, Router: typeof MemoryRouter}> = ({userRepository, eventScheduleRepository, Router}) => {
  const store = createStore(userRepository, userPresenter, eventScheduleRepository, eventSchedulePresenter)

  return (
    <Provider store={store}>
      <Router >
        <CheckLogged />
      </Router>
    </Provider>
  )
}

const CheckLogged: FC = () => {
  const loggedNickname = useSelector(selectNickname)
  const navigate = useNavigate()
  useEffect(() => {
    if(loggedNickname.length === 0){
      navigate('login')
      return
    }
    navigate('/')
  }, [loggedNickname])

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<User><EventSchedulesList /></User>} />
    </Routes>
  )
}
