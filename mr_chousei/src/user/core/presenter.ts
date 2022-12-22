export const createUserPresenter = () => {
  let nickname: string

  const getNickname = () => {
    return nickname
  }

  const setNickname = (newNickname: string) => {
    nickname = newNickname
  }

  return { getNickname, setNickname }
}

export type UserPresenter = ReturnType<typeof createUserPresenter>
