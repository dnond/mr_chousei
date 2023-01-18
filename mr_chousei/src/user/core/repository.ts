export const createUserRepository = () => {
  let nicknameList: string[]
  let loggedUserNickname: string

  const initUsers = (initialNicknameList: string[]) => {
    nicknameList = initialNicknameList
  }
  const login = (nickname: string) => {
    if (nicknameList.includes(nickname)) {
      loggedUserNickname = nickname
      return
    }

    throw 'Login failed'
  }
  const logout = () => {
    loggedUserNickname = ''
  }

  const getCurrentUserNickname = () => {
    return loggedUserNickname
  }

  return { initUsers, login, logout, getCurrentUserNickname }
}

export interface UserRepository {
  initUsers(initialNicknameList: string[]): void
  login(nickname: string): void
  logout(): void
  getCurrentUserNickname(): string
}
