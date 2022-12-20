export const userRepository = () => {
  let nicknameList: string[]
  let isLoggedUserNickname: string

  const initUsers = (initialNicknameList: string[]) => {
    nicknameList = initialNicknameList
  }
  const login = (nickname: string) => {
    if (nicknameList.includes(nickname)) {
      isLoggedUserNickname = nickname
      return
    }

    throw 'Login failed'
  }
  const getCurrentUserNickname = () => {
    return isLoggedUserNickname
  }

  return { initUsers, login, getCurrentUserNickname }
}

export interface UserRepository {
  initUsers(initialNicknameList: string[]): void
  login(nickname: string): void
  getCurrentUserNickname(): string
}
