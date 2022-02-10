// state
export const state = () => ({
  user: {
    userId: 30,
    userName: 'test_user30',
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
  getLoginUserName(state: any) {
    return state.user.userName
  },
}
