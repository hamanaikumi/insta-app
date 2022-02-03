<template>
  <main>
    <div v-for="post of posts" v-bind:key="post" class="article-container">
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
main {
  width: 100%;
  max-width: 428px;
  margin: 0 auto;

  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
