<template>
  <div class="container mx-auto py-8">
    <!-- profile -->
    <div class="grid justify-items-center py-8">
      <img class="h-28 w-28 rounded-full object-cover" :src="icon" />
      <label for="file-upload" class="cursor-pointer rounded-md py-2 px-4">
        <span class="text-xl text-accent-color">
          Change Profile Photo
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            @change="fileSelected"
        /></span>
      </label>
    </div>
    <!-- input -->
    <div class="grid grid-cols-4 gap-2 border-t px-4 py-8">
      <div class="col-span-1 py-2">User Name</div>
      <div
        class="col-span-3 border-b border-input-value-color text-input-value-color py-2 pl-2"
      >
        <input
          v-model="userName"
          type="text"
          class="appearance-none border-none w-full focus:outline-none"
        />
      </div>
      <div class="col-start-2 col-span-3 text-sm pl-2 h-6 text-warning-color">
        {{ errorUserName }}
      </div>
      <div class="col-span-1 py-2">Bio</div>
      <div
        class="col-span-3 border-b border-input-value-color text-input-value-color py-2 pl-2"
      >
        <input
          v-model="bio"
          type="text"
          class="appearance-none border-none w-full focus:outline-none"
        />
      </div>
    </div>
    <!-- button -->
    <div class="px-4 pb-4 text-center mt-2">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl text-dark-gray"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="inline-flex justify-center py-2 px-4 text-xl text-accent-color"
        type="button"
        @click="updateUserInfo"
      >
        Done
      </button>
    </div>
    <!-- logout -->
    <div class="grid justify-items-center border-t py-8">
      <button
        class="inline-flex justify-center py-2 px-4 text-xl text-warning-color"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      // アイコンのURL
      icon: '',
      // ユーザー名
      userName: '',
      // 自己紹介文
      bio: '',
      // ユーザー名エラー文
      errorUserName: '',
      // S3に送信する画像ファイル
      iconFile: {},
    }
  },
  /**
   * ログインしているユーザーのアイコン、ユーザー名、自己紹介を取得する.
   */
  created() {
    this.showUserInfo()
  },
  methods: {
    /**
     * 現在のユーザー情報を表示する.
     */
    async showUserInfo() {
      const res = await this.$store.getters['user/getLoginUserInfo']
      if (res.icon === '') {
        this.icon = 'https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png'
      } else {
        this.icon = res.icon
      }
      this.userName = res.userName
      this.bio = res.bio
    },
    /**
     * 新しいアイコン画像に入れ替える.
     * @param e - 添付ファイル
     */
    fileSelected(e: any): void {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        alert('画像ファイルを選択してください')
        return
      }
      this.icon = window.URL.createObjectURL(file)
      this.iconFile = file
    },
    /**
     * アイコン、名前、自己紹介文を変更する.
     */
    async updateUserInfo() {
      // S3からURLを取得
      const { url } = await fetch(
        'https://api-instagram-app.herokuapp.com/s3Url'
      ).then((res) => res.json())
      // S3のバケットに写真をPOST
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: this.iconFile as any,
      })
      const imageUrl: string = url.split('?')[0]
      // ログインしているユーザーIDを取得.
      const userId = await this.$store.getters['user/getLoginUserId']
      // APIに更新後のユーザー情報をPOST
      const res = await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/setting',
        {
          userId,
          icon: imageUrl,
          userName: this.userName,
          bio: this.bio,
        }
      )
      // 変更成功時
      if (res.data.status === 'success') {
        // ユーザー情報をVuexに保管
        await this.$store.commit('user/setLoginUserInfo', res.data.data)
        await this.showUserInfo()
        // 変更失敗時
      } else if (res.data.status === 'error') {
        this.errorUserName = 'そのユーザー名は既に使われています'
      }
    },
    /**
     * 変更をキャンセルしホーム画面に遷移する.
     */
    cancel() {
      this.$router.push('/Home')
    },
    /**
     * ログアウトする.
     */
    logout() {
      // ログイン状態をfalseにして、Vuexのユーザー情報を初期化。
      this.$store.commit('user/logout')
      // ログイン画面に遷移する
      this.$router.push('/')
    },
  },
})
</script>
<style></style>
