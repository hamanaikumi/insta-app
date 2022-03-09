<template>
  <div class="content-center px-4">
    <div class="flex justify-center pb-4">
      <!-- logo -->
      <img src="../static/images/logo.png" alt="ロゴ" width="200" />
    </div>
    <!-- input -->
    <div class="my-4 text-xl">
      <div class="bg-gray-100 py-4 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create user name</label>
          <br />
          <input
            v-model="userName"
            class="appearance-none bg-gray-100 border-none focus:outline-none py-2 px-3"
            type="text"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span> {{ errorUsername }}</span>
      </div>
      <div class="bg-gray-100 py-4 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create a password</label><br />
          <input
            v-model="password"
            class="appearance-none bg-gray-100 border-none focus:outline-none py-2 px-3"
            autocomplete="off"
            type="password"
          />
        </div>
      </div>
      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span>{{ errorPassword }}</span>
      </div>
    </div>
    <div class="mt-4">
      <!-- button -->
      <button
        class="text-white bg-accent-color focus:ring-4 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
        @click="signup"
      >
        Create New Account
      </button>
    </div>
    <div class="text-sm pl-4 pt-2 text-warning-color">
      <span>{{ errorSignup }}</span>
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
      errorSignup: '',
    }
  },
  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },
  methods: {
    /**
     * ユーザー登録する.
     */
    async signup() {
      // 初期化
      this.hasError = false
      this.errorUsername = ''
      this.errorPassword = ''
      this.errorSignup = ''
      // エラーチェック
      if (this.userName === '') {
        this.errorUsername = 'ユーザー名を入力してください'
        this.hasError = true
      }
      if (this.userName.length > 30) {
        this.errorUsername = 'ユーザー名は30字以内で入力してください'
        this.hasError = true
      }
      if (!/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(this.userName)) {
        this.errorUsername = 'ユーザー名は半角英数記号で入力してください'
        this.hasError = true
      }
      if (
        !(/[a-z]+/.test(this.password) && /[0-9]+/.test(this.password)) ||
        this.password.length < 6
      ) {
        this.errorPassword = 'パスワードは半角英数字6字以上で入力してください'
        this.hasError = true
      }
      // APIにPOST
      if (!this.hasError) {
        const res = await this.$axios.post(
          'https://api-instagram-app.herokuapp.com/signup',
          {
            userName: this.userName,
            password: this.password,
          }
        )
        // 登録成功時
        if (res.data.status === 'success') {
          // ユーザー情報をVuexに保管
          this.$store.commit('user/setLoginUserInfo', res.data.data)

          // AuthプラグインでtokenをCookieに保存
          const token = res.data.token
          Auth.login(this.$cookies, token)

          // ホーム画面に遷移
          await this.$router.push('/home')
          // 登録失敗時
        } else if (res.data.status === 'error') {
          this.errorSignup = 'そのユーザー名は既に登録済みです'
        }
      }
    },
  },
})
</script>
