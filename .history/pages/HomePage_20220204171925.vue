<template>
  <article>
    <div v-for="post of posts" v-bind:key="post" class="article-container">
      <PostDetail></PostDetail>
    </div>
  </article>
</template>

<script lang="ts">
// ↓書かないとstoreが呼び出せない
/* eslint no-unused-expressions: "off" */

import PostDetail from '../components/PostDetail.vue'
export default {
  components: { PostDetail },
}
</script>

<style scoped>
article {
  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
