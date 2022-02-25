import { NuxtCookies } from 'cookie-universal-nuxt'

export default class Auth {
  // Cookieに保存するときのキー名
  private static ACCESS_TOKEN_KEY: string = '__access_token'

  // 認証済みかどうかの判定
  public static authenticated(cookie: NuxtCookies): boolean {
    const payload = this.getPayload(cookie)
    if (payload) {
      return true
    }
    return false
  }

  // CookieからJWTを削除
  public static logout(cookie: NuxtCookies): void {
    cookie.remove(this.ACCESS_TOKEN_KEY)
  }

  // CookieからJWTを取得
  public static getAccessToken(cookie: NuxtCookies): string {
    return cookie.get(this.ACCESS_TOKEN_KEY)
  }

  // JWTをCookieに保存
  public static login(cookie: NuxtCookies, token: string): void {
    return cookie.set(this.ACCESS_TOKEN_KEY, token, {
      // 有効期限（秒単位）
      maxAge: 60 * 60 * 24 * 1,
    })
  }

  // Cookieに保存されているTokenのJWTのpayloadをオブジェクト形式で取得する
  public static getPayload(
    cookie: NuxtCookies
  ): { [index: string]: string } | null {
    const token = this.getAccessToken(cookie)
    if (!token) return null
    const payload = token.split('.')[1]
    const decoded = Buffer.from(payload, 'base64').toString()
    return JSON.parse(decoded)
  }
}
