<template>
  <div class="content-center px-4 py-8">
    <div class="flex justify-center mt-16">
      <!-- logo -->
      <img src="https://svgsilh.com/svg/1594387.svg" alt="" width="200" />
    </div>
    <div class="my-4 text-xl">
      <div class="bg-gray-50 py-4 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create user name</label>
          <br />
          <input
            v-model="userName"
            class="appearance-none bg-gray-50 border-none focus:outline-none py-2 px-3"
            type="text"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span> {{ errorUsername }}</span>
      </div>
      <div class="bg-gray-50 py-4 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create a password</label><br />
          <input
            v-model="password"
            class="appearance-none bg-gray-50 border-none focus:outline-none py-2 px-3"
            autocomplete="off"
            type="password"
          />
        </div>
      </div>
      <div class="h-12 text-sm pl-4 pt-2 text-warning-color">
        <span>{{ errorPassword }}</span>
      </div>
    </div>
    <div class="mt-8">
      <!-- button -->
      <button
        class="text-white bg-accent-color focus:ring-4 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
        @click="signup"
      >
        Create New Account
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
    }
  },
  methods: {
    /**
     * ユーザー登録する.
     */
    signup() {
      this.errorUsername = ''
      this.errorPassword = ''
      if (this.userName === '') {
        this.errorUsername = 'ユーザー名を入力してください'
      }
      if (this.password === '') {
        this.errorUsername = 'パスワードを入力してください'
      }
      if (
        !(/[a-z]+/.test(this.password) && /[0-9]+/.test(this.password)) ||
        this.password.length < 6
      ) {
        this.errorPassword = '半角英数字6字以上で入力してください'
      }
    },
  },
})
</script>
