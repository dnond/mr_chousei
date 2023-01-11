import { render, screen } from "@testing-library/react"
import { App } from "../../App"
import userEvent from "@testing-library/user-event"
import { createRepositories } from "../../__test__/createRepositories"
import { MemoryRouter, redirect } from "react-router-dom"

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
    const { eventScheduleRepository, userRepository } = createRepositories()

    userRepository.initUsers(initialNicknameList)

    render(<App userRepository={userRepository} eventScheduleRepository={eventScheduleRepository} Router={MemoryRouter} />)
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