<template>
  <main>
    <section
      v-for="post of posts"
      v-bind:key="post.id"
      class="article-container"
    >
      <PostDetail></PostDetail>
    </section>
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

<style scoped></style>
