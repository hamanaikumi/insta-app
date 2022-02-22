<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-show="postsId.length === 0"
      class="none-posts flex flex-col justify-center"
    >
      <div class="msg text-dark-gray text-lg">
        <strong class="font-medium"> Welcome to まるまるgram</strong>
        <br /><br />
        <span class="font-extralight">
          When you follow people,<br />
          you'll see the photos they post here.
        </span>
      </div>
    </div>
    <article>
      <div v-for="postId of postsId" :key="postId" class="article-container">
        <PostDetail :give-post-id="postId" @update="emitUpdate"></PostDetail>
      </div>
    </article>
  </div>
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
    }
  },

  created() {
    // ログインしているユーザーのIDをstoreより取得
    this.loginUserId = this.$store.getters['user/getLoginUserId']

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
    /**
     * ホーム画面を更新する.
     */
    emitUpdate() {
      this.getMyFollowUsersPost()
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
  height: 75vh;
  .msg {
    text-align: center;
    align-items: center;
  }
}
</style>
