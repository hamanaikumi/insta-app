import { Middleware, Context } from '@nuxt/types'
import Auth from '@/plugins/auth'

const auth: Middleware = (context: Context) => {
  console.log(Auth.authenticated(context.$cookies))

  if (!Auth.authenticated(context.$cookies)) {
    // 未認証ならログイン画面にリダイレクト
    return context.redirect('/')
  }
}

export default auth
