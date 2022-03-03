// state
export const state = () => ({
  // 投稿削除モーダルの表示/非表示の状態
  modalStatus: false,
})

// actions
export const actions = {}

// mutaions
export const mutations = {
  /**
   * 投稿削除モーダルの状態を表示に切り替える.
   * @param state ステート
   */
  modalOn(state: any) {
    state.modalStatus = true
  },
  /**
   * 投稿削除モーダルの状態を非表示に切り替える.
   * @param state ステート
   */
  modalOff(state: any) {
    state.modalStatus = false
  },
}

// getters
export const getters = {
  /**
   * 投稿削除モーダルの状態によってヘッダーフッターのoverlayを切り替える.
   * @param state -ステートオブジェクト
   * @returns 投稿削除モーダルの表示/非表示の状態
   */
  getDeleteModalStatus(state: any) {
    return state.modalStatus
  },
}
