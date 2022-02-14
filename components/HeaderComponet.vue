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
            $route.path === '/FollowFollower'
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
            $route.path === '/Search'
          "
          to="/addPost"
          class="mr-4"
        >
          <i class="far fa-plus-square fa-lg fa-fw"></i>
        </nuxt-link>
        <!-- 通知アイコン（仮） -->
        <nuxt-link
          v-if="$route.path === '/Home' || $route.path === '/Search'"
          to="/"
          class="mr-4"
        >
          <i class="far fa-heart fa-lg fa-fw"></i>
        </nuxt-link>
        <!-- 設定アイコン -->
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/Mypage' ||
            $route.path === '/Userpage'
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
  data() {
    return {}
  },
  computed: {
    userName(): string {
      return this.$store.getters['user/getLoginUserName']
    },
  },
})
</script>

<style></style>
