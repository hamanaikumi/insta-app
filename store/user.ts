// state
export const state = () => ({
  user: {},
  isLogin: false,
  loginUserInfo: {
    bio: '',
    follow: [],
    follower: [],
    icon: '',
    password: '',
    userId: 0,
    userName: '',
  },
})

// actions
export const actions = {}

// mutaions
export const mutations = {
  /**
   * 会員登録/ログインしたユーザーの情報をstateに保存する.
   * @param state ステート
   * @param userInfo ログインしたユーザーの情報
   */
  setLoginUserInfo(state: any, userInfo: any) {
    state.loginUserInfo = userInfo
  },
  /**
   * 会員登録/ログインしたらログイン状態をtrueにする.
   * @param state ステート
   */
  login(state: any) {
    state.isLogin = true
  },
}

// getters
export const getters = {
  getLoginUserInfo(state: any) {
    return state.loginUserInfo
  },
}
