// state
export const state = () => ({
  user: {
    userId: 23,
    userName: 'test_user23',
    password: 'test2222',
    follow: [3, 5, 6],
    follower: [3, 5],
  },
  isLogin: false,
})

// actions
export const actions = {}

// mutaions
export const mutations = {}

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
   * ログインしているユーザーの名前を取得する.
   * @param state -ステートオブジェクト
   * @returns ログインユーザーの名前
   */
  getLoginUserId(state: any) {
    return state.user.userid
  },
}
