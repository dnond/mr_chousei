import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {App} from './App'
import { createEventScheduleRepository } from './event/schedule/core/repository'
import { createUserRepository } from './user/core/repository'

const userRepository = createUserRepository()
userRepository.initUsers([
    'Alice',
    'Bob',
    'Chris'
  ])
const eventScheduleRepository = createEventScheduleRepository()
eventScheduleRepository.init(
  [
    {
      id: 1,
      times: new Date("2023-01-02"),
      availabilityState: null,
    },
    {
      id: 2,
      times: new Date("2023-01-03"),
      availabilityState: null,
    },
    {
      id: 3,
      times: new Date("2023-01-04"),
      availabilityState: null,
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App userRepository={userRepository} eventScheduleRepository={eventScheduleRepository} Router={BrowserRouter} />
  </React.StrictMode>,
)
