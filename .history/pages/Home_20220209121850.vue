<template>
  <article>
    <div class="article-container">
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
  methods: {
    async getMyFollowUserPost() {
      // const response = this.$axios.$get(`https://api-instagram-app.herokuapp.com/home/:idhttps://api-instagram-app.herokuapp.com/home/${}`)
    },
  },
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
