<template>
  <div class="container mx-auto py-8">
    <!-- profile -->
    <div class="grid justify-items-center py-4">
      <img class="h-36 w-36 rounded-full" :src="icon" />
      <button
        class="inline-flex justify-center py-2 px-4 text-xl text-accent-color"
        @click="changeIcon"
      >
        Change Profile Photo
      </button>
    </div>
    <!-- input -->
    <div class="grid grid-cols-4 gap-5 border-t px-4 py-8">
      <div class="col-span-1 py-2">User Name</div>
      <div
        class="col-span-3 border-b border-input-value-color text-input-value-color py-2"
      >
        <input
          type="text"
          class="appearance-none border-none w-full focus:outline-none"
          :placeholder="userName"
        />
      </div>
      <div class="col-span-1 py-2">Bio</div>
      <div
        class="col-span-3 border-b border-input-value-color text-input-value-color py-2"
      >
        <input
          type="text"
          class="appearance-none border-none w-full focus:outline-none"
          :placeholder="bio"
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
    <div class="grid justify-items-center border-t py-4">
      <button
        class="inline-flex justify-center py-2 px-4 text-xl text-warning-color"
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
    }
  },
  /**
   * ログインしているユーザーのアイコン、ユーザー名、自己紹介を取得する.
   */
  created() {
    const res = this.$store.getters['sample/getLoginUser']
    this.icon = res.icon
    this.userName = res.userName
    this.bio = res.bio
  },
  methods: {},
})
</script>
<style></style>
