// いいねしたユーザーの名前保存

// state
export const state = () => ({
  // いいねしたユーザー名
  likesList: [],
})

// actions
export const actions = {}

// mutaions
export const mutations = {
  getLikesUsers(state: any, payload: any) {
    state.likesList = payload
  },
}

// getters
export const getters = {
  getLikesUserNameList(state: any) {
    return state.likesList
  },
}
