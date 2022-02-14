<template>
  <article>
    <div v-for="post of posts" v-bind:key="post" class="article-container">
      <PostDetail></PostDetail>
    </div>
  </article>
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
main {
  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
