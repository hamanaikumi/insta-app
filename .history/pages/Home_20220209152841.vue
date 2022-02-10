<template>
  <article>
    <div class="article-container">
      <!-- <PostDetail></PostDetail> -->
    </div>
  </article>
</template>

<script lang="ts">
// ↓書かないとstoreが呼び出せない
/* eslint no-unused-expressions: "off" */
import Vue from 'vue'
import axios from 'axios'
// import PostDetail from '../components/PostDetail.vue'
export default Vue.extend({
  // components: { PostDetail },

  data() {
    return {
      loginUserId: Number,
      postsId: [],
    }
  },

  created() {
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getMyFollowUserPost()
  },
  methods: {
    /**
     * 自分のフォローしているユーザーの投稿を取得する.
     */
    async getMyFollowUserPost() {
      const response = await axios.get(
        `https://api-instagram-app.herokuapp.com/home/${this.loginUserId}`
      )

      const posts = response.data
      console.dir('HOME API posts:' + Object.keys(postId))
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
