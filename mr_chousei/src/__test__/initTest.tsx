import { createUserRepository } from "../user/core/repository"
import { createEventScheduleRepository } from "../event/schedule/core/repository"
import { UserRepository } from "../user/core/repository"
import { EventScheduleRepository } from "../event/schedule/core/repository"
import { App } from "../App"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

export const initTest = ({ userRepository = createUserRepository(), eventScheduleRepository = createEventScheduleRepository() }: { userRepository?: UserRepository, eventScheduleRepository?: EventScheduleRepository }) => {
  render(<App userRepository={ userRepository } eventScheduleRepository = { eventScheduleRepository } Router = { MemoryRouter } />)
}
