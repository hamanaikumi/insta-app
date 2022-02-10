<template>
  <main class="main p-4 bg-white">
    <div class="w-full flex">
      <p v-if="$route.path !== '/Login' && $route.path !== '/Signup'">
        instagram
      </p>
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
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

/* eslint no-unused-expressions: "off" */
export default Vue.extend({})
</script>

<style></style>
