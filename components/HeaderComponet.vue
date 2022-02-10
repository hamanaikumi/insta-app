<template>
  <main class="main p-4 shadow-sm">
    <div class="w-full flex">
      <p class="inline-block">instagram</p>
      <div class="w-full text-right">
        <nuxt-link to="/addPost">
          <i
            v-if="$route.path === '/addPost' || $route.path === '/'"
            class="far fa-plus-square fa-lg fa-fw mr-4"
          ></i>
        </nuxt-link>

        <i class="far fa-heart fa-lg fa-fw mr-4"></i>
        <i class="fas fa-cog fa-lg fa-fw"></i>
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
