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
      postsId:String[],
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
      // 投稿詳細データオブジェクトを代入
      const posts = response.data
      // postIDだけを取り代して
      for (const post of posts) {
        console.dir('HOME API post:' + JSON.stringify(post.postId))
        this.postsId.push(post.postId)
      }
      console.dir('this.postsId' + this.postsId)
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
