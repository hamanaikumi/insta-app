// state
export const state = () => ({
  // ログインしているユーザーの情報
  user: {
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
   * @param user ログインしたユーザーの情報
   */
  setLoginUserInfo(state: any, user: any) {
    state.user = user
  },
}

// getters
export const getters = {
  /**
   * ログインしているユーザーの名前を取得する.
   * @param state -ステートオブジェクト
   * @returns ログインユーザーの名前
   */
  getLoginUserName(state: any) {
    return state.user.userName
  },
  /**
   * ログインしているユーザーIDを取得する.
   * @param state -ステートオブジェクト
   * @returns ログインユーザーID
   */
  getLoginUserId(state: any) {
    return state.user.userId
  },
  /**
   * ログインしたユーザーの情報を返す.
   * @param state ステート
   * @returns ログインしているユーザーの情報
   */
  getLoginUserInfo(state: any) {
    return state.user
  },
  getLoginStatus(state: any) {
    return state.isLogin
  },
}
