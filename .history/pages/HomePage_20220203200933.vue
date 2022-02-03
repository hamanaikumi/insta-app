<template>
  <main>
    <div v-for="post of posts" v-bind:key="post.id" class="article-container">
      <PostDetail></PostDetail>
    </div>
  </main>
</template>

<script>
import PostDetail from '../components/PostDetail.vue'
export default {
  components: { PostDetail },

  data() {
    return {
      posts: 5,
    }
  },
}
</script>

<style scoped>
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
