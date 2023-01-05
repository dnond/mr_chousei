import { createEventScheduleRepository } from "../event/schedule/core/repository";
import { createUserRepository } from "../user/core/repository";

export const createRepositories = () => {
  const eventScheduleRepository = createEventScheduleRepository();
  const userRepository = createUserRepository()

  return { eventScheduleRepository, userRepository }
}