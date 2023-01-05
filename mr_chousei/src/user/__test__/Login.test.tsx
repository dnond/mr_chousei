import { createUserPresenter } from "../core/presenter"
import { createUserRepository } from "../core/repository"
import { createStore } from "../../store"
import { selectNickname } from "../store/selectors"
import { login } from "../store/actions"
import { render, screen } from "@testing-library/react"
import { App } from "../../App"
import userEvent from "@testing-library/user-event"

describe('login', () => {
  it('can login', async () => {
    const steps = createSteps()

    steps.givenUsers([
      'Alice',
      'Bob',
      'Chris'
    ])
    await steps.whenUserLogin('Alice')
    await steps.thenLoggedUserIs('Alice')
  })
})

const createSteps = () => {
  const repository = createUserRepository()

  const givenUsers = (initialNicknameList: string[]) => {
    repository.initUsers(initialNicknameList)

    const eventScheduleRepository = createEventScheduleRepository()

    render(<App userRepository={repository}/>)
  }

  const whenUserLogin = async (nickname: string) => {

    const nicknameInput = screen.getByRole("textbox", { name: "Nickname" })
    const loginButton = screen.getByRole("button", { name: "Login" })

    await userEvent.type(nicknameInput, nickname)
    await userEvent.click(loginButton)

  }

  const thenLoggedUserIs = async (nickname: string) => {
    const loggedInformation = await screen.findByRole("banner")

    expect(loggedInformation).toHaveTextContent("Logged User: " + nickname)
  }

  return { thenLoggedUserIs, whenUserLogin, givenUsers }
}