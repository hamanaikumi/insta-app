<template>
  <main>
    <section v-for="(article, i) of 5" v-bind:key="i">
      <PostDetail></PostDetail>
    </section>
  </main>
</template>

<script>
import PostDetail from '../components/PostDetail.vue'
export default {
  components: { PostDetail },
}
</script>

<style></style>
