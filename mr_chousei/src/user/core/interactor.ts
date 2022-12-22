import { UserPresenter } from "./presenter"
import { UserRepository } from "./repository"

export const createUserInteractor = (repository: UserRepository, presenter: UserPresenter) => {
  const login = (nickname: string) => {
    repository.login(nickname)
    presenter.setNickname(repository.getCurrentUserNickname())
  }

  return { login }
}

export type UserInteractor = ReturnType<typeof createUserInteractor>