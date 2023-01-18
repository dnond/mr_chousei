import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createUserRepository } from "../core/repository"
import { initTest } from "../../__test__/initTest"

describe('logout', () => {
  it('can logout', async () => {
    const steps = createSteps()

    steps.givenLoggedUser('Alice')
    await steps.whenUserLogout()
    steps.thenUserIsLogout()
  })
})

const createSteps = () => {
  const userRepository = createUserRepository()

  const givenLoggedUser = (nickname: string) => {
    userRepository.initUsers([nickname])
    userRepository.login(nickname)

    initTest({ userRepository })
  }

  const whenUserLogout = async () => {
    const logoutButton = screen.getByRole("button", { name: "Logout" })

    await userEvent.click(logoutButton)
  }

  const thenUserIsLogout = () => {
    const loggedInformation = screen.queryByRole("banner")

    expect(loggedInformation).not.toBeInTheDocument()

  }

  return { givenLoggedUser, whenUserLogout, thenUserIsLogout }
}
