export default function ({ store, redirect }) {
  // ログインしていない状態でURL直アクセスした時にログインページに遷移する
  const loginUser = store.getters['user/getLoginStatus']
  if (!loginUser) return redirect('/')
}
