// state
export const state = () => ({
  // ログインしているユーザーの情報
  user: {
    bio: '',
    follow: [],
    follower: [],
    icon: '',
    password: '',
    userId: 2,
    userName: 'test_user2',
  },
  // ログイン状態
  isLogin: false,
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
  /**
   * 会員登録/ログインしたらログイン状態をtrueにする.
   * @param state ステート
   */
  login(state: any) {
    state.isLogin = true
  },
  /**
   * ログイン状態をfalseにする.
   * @param state ステート
   */
  logout(state: any) {
    state.isLogin = false
    // ユーザー情報を初期化
    state.user = {}
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
}
