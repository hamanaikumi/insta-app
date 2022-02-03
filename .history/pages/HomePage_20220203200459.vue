<template>
  <main>
    <section v-for="post of posts" v-bind:key="post.id">
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
      posts: [],
    }
  },
}
</script>

<style></style>
