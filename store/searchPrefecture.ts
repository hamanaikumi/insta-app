// 投稿詳細画面から取得した都道府県名のstore

// state
export const state = () => ({
  // 取得した都道府県名
  prefectureName: '',
})

// mutaions
export const mutations = {
  /**
   * 都道府県名を取得して保存 (stateの初期化も).
   * @param state -ステート
   * @param context - 投稿詳細から取得した都道府県名
   */
  catchPrefecture(state: any, context: any) {
    state.prefectureName = context
  },
}

// getters
export const getters = {
  /**
   * 都道府県名を取得する.
   * @param state -ステート
   * @returns ステートに保存してる都道府県
   */
  getPrefectureName(state: any) {
    return state.prefectureName
  },
}
