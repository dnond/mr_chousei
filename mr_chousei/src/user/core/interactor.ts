import { UserPresenter } from "./presenter"
import { UserRepository } from "./repository"

export const createUserInteractor = (repository: UserRepository, presenter: UserPresenter) => {
  const login = (nickname: string) => {
    repository.login(nickname)
    refresh()
  }
  const logout = () => {
    repository.logout()
    refresh()
  }
  const refresh = () => {
    presenter.setNickname(repository.getCurrentUserNickname())
  }

  return { login, logout }
}

export type UserInteractor = ReturnType<typeof createUserInteractor>