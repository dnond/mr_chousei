import { FC } from "react"
import { User } from "./user/component/User"
import { EventSchedulesList } from "./event/schedule/component/EventScheduleList"
import { UserRepository } from "./user/core/repository"
import { createUserPresenter } from "./user/core/presenter"
import { createStore } from "./store"
import { Provider } from "react-redux"
import { EventSchedule } from "./event/schedule/core/entities"
import { createEventScheduleRepository, EventScheduleRepository } from "./event/schedule/core/repository"
import { createEventSchedulesPresenter } from "./event/schedule/core/presenter"

const userPresenter = createUserPresenter()
const eventSchedulePresenter = createEventSchedulesPresenter()

export const App: FC<{userRepository: UserRepository, eventScheduleRepository: EventScheduleRepository}> = ({userRepository, eventScheduleRepository}) => {
  const store = createStore(userRepository, userPresenter, eventScheduleRepository, eventSchedulePresenter)

  return (
    <Provider store={store}>
      <User />
      <EventSchedulesList />
    </Provider>
  )
}
