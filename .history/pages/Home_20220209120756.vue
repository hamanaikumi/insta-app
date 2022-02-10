<template>
  <article>
    <div
      class="article-container"
      v-for="post of followingPostList"
      v-bind:key="post.postId"
    >
      <PostDetail></PostDetail>
    </div>
  </article>
</template>

<script lang="ts">
// ↓書かないとstoreが呼び出せない
/* eslint no-unused-expressions: "off" */
import Vue from 'vue'
import PostDetail from '../components/PostDetail.vue'
export default Vue.extend({
  components: { PostDetail },

  data() {
    return {}
  },

  created() {},
})
</script>
<style scoped>
article {
  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
