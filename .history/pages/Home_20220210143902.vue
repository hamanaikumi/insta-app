<template>
  <article>
    <!-- v-show="postsId.length === 0" -->
    <div>投稿がありません</div>
    <div v-for="postId of postsId" :key="postId" class="article-container">
      <PostDetail :give-post-id="postId"></PostDetail>
    </div>
  </article>
</template>

<script lang="ts">
// ↓書かないとstoreが呼び出せない
/* eslint no-unused-expressions: "off" */
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      // ログインユーザーID
      loginUserId: String,

      // フォローしている人の投稿ID Array
      postsId: {},

      //
    }
  },

  created() {
    // ログインしているユーザーのIDをstoreより取得
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getMyFollowUsersPost()
  },
  methods: {
    /**
     * 自分のフォローしているユーザーの投稿を取得する.
     */
    async getMyFollowUsersPost() {
      const response = await this.$axios.get(
        `https://api-instagram-app.herokuapp.com/home/${this.loginUserId}`
      )
      // 投稿詳細データオブジェクトを代入
      const posts = response.data

      // postIDだけを取り出す
      const postIdArray = []
      for (const post of posts) {
        // console.dir('HOME API post:' + JSON.stringify(post.postId))
        postIdArray.push(post.postId)
      }
      this.postsId = postIdArray
      // console.log('this.postID配列？' + this.postsId)
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
