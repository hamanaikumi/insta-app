<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-center pb-4">
      <!-- logo -->
      <img src="../static/images/logo.png" alt="ロゴ" width="200" />
    </div>
    <!-- input -->
    <div class="my-4 text-lg">
      <div class="bg-gray-100 py-4 px-4 rounded-lg">
        <input
          v-model="userName"
          class="appearance-none bg-gray-100 border-none focus:outline-none px-3"
          type="text"
          autocomplete="off"
          placeholder="user name"
        />
      </div>

      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span> {{ errorUsername }}</span>
      </div>
      <div class="bg-gray-100 py-4 px-4 rounded-lg">
        <input
          v-model="password"
          class="appearance-none bg-gray-100 border-none focus:outline-none px-3"
          autocomplete="off"
          type="password"
          placeholder="password"
        />
      </div>
      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span>{{ errorPassword }}</span>
      </div>
    </div>
    <div class="mt-4">
      <!-- button -->
      <button
        class="text-white bg-accent-color focus:ring-4 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center"
        @click="login"
      >
        Log&nbsp;In
      </button>
    </div>
    <div class="text-sm pl-4 pt-2 h-4 text-warning-color">
      <span>{{ errorLogin }}</span>
    </div>

    <div class="border-t text-center mt-12">
      <div class="mt-12 text-lg">Don&rsquo;t have an account ?</div>
      <router-link to="/Signup">
        <div class="py-2 px-4 text-xl text-accent-color font-semibold">
          Sign Up
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Auth from '../plugins/auth'

export default Vue.extend({
  data() {
    return {
      // ユーザー名
      userName: '',
      // パスワード
      password: '',
      // ユーザー名エラー文
      errorUsername: '',
      // パスワードエラー文
      errorPassword: '',
      // 最終エラーチェック
      hasError: false,
      // ユーザー登録失敗時のエラー文
      errorLogin: '',
    }
  },
  methods: {
    /**
     * ログインする.
     */
    async login() {
      // 初期化
      this.hasError = false
      this.errorUsername = ''
      this.errorPassword = ''
      this.errorLogin = ''
      // エラーチェック
      if (this.userName === '') {
        this.errorUsername = 'ユーザー名を入力してください'
        this.hasError = true
      }
      if (this.password === '') {
        this.errorPassword = 'パスワードを入力してください'
        this.hasError = true
      }
      // APIにPOST
      if (!this.hasError) {
        const res = await this.$axios.post(
          'https://api-instagram-app.herokuapp.com/login',
          {
            userName: this.userName,
            password: this.password,
          }
        )

        // ログイン成功時
        if (res.data.status === 'success') {
          // ユーザー情報をVuexに保管
          this.$store.commit('user/setLoginUserInfo', res.data.data)

          // AuthプラグインでtokenをCookieに保存
          const token = res.data.token
          Auth.login(this.$cookies, token)

          // ホーム画面に遷移
          await this.$router.push('/home')
          // ログイン失敗時
        } else if (res.data.status === 'error') {
          this.errorLogin = 'ユーザー名とパスワードが一致しません'
        }
      }
    },
  },
})
</script>
<style>
main {
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
}
</style>
