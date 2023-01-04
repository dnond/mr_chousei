import { FC } from "react"
import { User } from "./user/component/User"
import { UserRepository } from "./user/core/repository"
import { createUserPresenter } from "./user/core/presenter"
import { createStore } from "./store"
import { Provider } from "react-redux"

const userPresenter = createUserPresenter()

export const App: FC<{userRepository: UserRepository}> = ({userRepository}) => {
  const store = createStore(userRepository, userPresenter)

  return (
    <Provider store={store}>
      <User />
    </Provider>
  )
}
