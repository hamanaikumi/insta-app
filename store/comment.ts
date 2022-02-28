// コメント数保存

// state
export const state = () => ({
  // コメントの数
  commentCount: 0,
})

// mutaions
export const mutations = {
  getCommentCount(state: any, payload: any) {
    state.commentCount = payload
  },
}

// getters
export const getters = {
  getCommentCount(state: any) {
    return state.commentCount
  },
}
