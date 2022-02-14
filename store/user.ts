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
    userName: 'test_user1',
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
   * @param userInfo ログインしたユーザーの情報
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
    return state.loginUserInfo
  },
}
