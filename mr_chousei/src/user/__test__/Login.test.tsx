import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { initTest } from "../../__test__/initTest"
import { createUserRepository } from "../core/repository"

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
  const givenUsers = (initialNicknameList: string[]) => {
    const userRepository = createUserRepository()

    userRepository.initUsers(initialNicknameList)
    initTest({userRepository})
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