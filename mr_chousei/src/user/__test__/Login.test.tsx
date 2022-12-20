import { userInteractor } from "../core/interactor"
import { userPresenter } from "../core/presenter"
import { userRepository, UserRepository } from "../core/repository"

describe('login', () => {
  it('can login', () => {
    const steps = createSteps()

    steps.givenUsers([
      'alice',
      'bob',
      'chris'
    ])
    steps.whenUserLogin('alice')
    steps.thenLoggedUserIs('alice')
  })
})

const createSteps = () => {
  const repository = userRepository()
  const presenter = userPresenter()
  const interactor = userInteractor(repository, presenter)

  const givenUsers = (initialNicknameList: string[]) => {
    repository.initUsers(initialNicknameList)
  }

  const whenUserLogin = (nickname: string) => {
    interactor.login(nickname)
    // ニックネームに合致した入力があればログインOK
  }

  const thenLoggedUserIs = (nickname: string) => {
    expect(presenter.getNickname()).toBe(nickname)
  }

  return { thenLoggedUserIs, whenUserLogin, givenUsers }
}



