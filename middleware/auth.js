export default function ({ app, redirect }) {
  // ログインしていない状態でURL直アクセスした時にログインページに遷移する
  const loginUser = app.$cookies.get('login')
  if (!loginUser) {
    return redirect('/')
  }
}
