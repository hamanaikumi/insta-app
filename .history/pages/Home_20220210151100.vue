<template>
  <article>
    <div v-show="postsId.length === 0" class="none-posts">
      <div class="msg">投稿がありません<br />友達をフォローしよう!</div>
    </div>
    <div v-for="postId of postsId" :key="postId" class="article-container">
      <PostDetail :give-post-id="postId"></PostDetail>
    </div>
  </article>
</template>

<script lang="ts">
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
    const loginInfo = this.$store.getters['user/getLoginUserInfo']
    this.loginUserId = loginInfo.loginUserId

    // 自分のフォローしているユーザーの投稿を取得する.
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
        postIdArray.push(post.postId)
      }
      this.postsId = postIdArray
    },
  },
})
</script>
<style scoped lang="scss">
article {
  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}

.none-posts {
  width: 100%;
  height: 99vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .msg {
    font-size: 1.8rem;
    color: #626262;
    font-weight: 600;
    text-align: center;
    align-items: center;
  }
}
</style>
