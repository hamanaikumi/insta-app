<template>
  <div class="p-4 bg-white">
    <div class="w-full flex">
      <div>
        <nuxt-link
          v-if="$route.path === '/Home' || $route.path === '/Search'"
          to="/Home"
        >
          <!-- 後で変更 -->
          <p>instagram</p>
        </nuxt-link>
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/Mypage' ||
            $route.path === '/Userpage' ||
            $route.path === '/Setting' ||
            $route.path === '/FollowFollower' ||
            $route.path === '/activity'
          "
          to="/Mypage"
          class="font-bold"
        >
          {{ userName }}
        </nuxt-link>
      </div>
      <div class="w-full text-right">
        <!-- 投稿アイコン -->
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/Mypage' ||
            $route.path === '/Userpage' ||
            $route.path === '/Home' ||
            $route.path === '/Search' ||
            $route.path === '/activity'
          "
          to="/addPost"
          class="mr-4"
        >
          <i class="far fa-plus-square fa-lg fa-fw"></i>
        </nuxt-link>
        <!-- 通知アイコン（仮） -->
        <nuxt-link
          v-if="$route.path === '/Home' || $route.path === '/Search'"
          to="/activity"
          class="mr-4"
        >
          <i class="far fa-heart fa-lg fa-fw relative">
            <div v-if="giveNotice===false">
              <p
                class="animate-ping absolute right-0 top-[-8px] text-red-400 text-[1px]"
              >
                ●
              </p>
              <p class="absolute right-0 top-[-8px] text-red-400 text-[1px]">
                ●
              </p>
            </div>
          </i>
        </nuxt-link>
        <!-- 設定アイコン -->
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/Mypage' ||
            $route.path === '/Userpage' ||
            $route.path === '/activity'
          "
          to="/Setting"
          class="mr-4"
        >
          <i class="fas fa-cog fa-lg fa-fw"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/* eslint no-unused-expressions: "off" */
export default Vue.extend({
  props: {
    giveNotice: { type: Boolean, required: true, },
  },
  computed: {
    /**
     * ログインしているユーザー名を取得する
     */
    userName(): string {
      return this.$store.getters['user/getLoginUserName']
    },
    /**
     * 親から最新の通知を受け取ってそれが確認済みの場合はtrue,していない場合はfalseを渡す.
     */
    notices(): Boolean {
      if (this.giveNotice === false) {
        return false
      } else {
        return true
      }
    },
  },
})
</script>

<style></style>
