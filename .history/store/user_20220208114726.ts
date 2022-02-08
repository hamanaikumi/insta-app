// state
export const state = () => ({
  user: {
    userId: 2,
    userName: 'test_user2',
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
  getLoginUserInfo(state: any) {
    return state.user.userName
  },
}
