import { UserPresenter } from "./presenter"
import { UserRepository } from "./repository"

export const userInteractor = (repository: UserRepository, presenter: UserPresenter) => {
  const login = (nickname: string) => {
    repository.login(nickname)
    presenter.setNickname(repository.getCurrentUserNickname())
  }

  return { login }
}
