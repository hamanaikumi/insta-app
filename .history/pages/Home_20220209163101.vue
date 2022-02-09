<template>
  <article>
    <div
      class="article-container"
      v-for="postId of postsId"
      v-bind:key="postId"
    >
      <PostDetail :givePostId="postId"></PostDetail>
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
      postsId: {},
    }
  },

  created() {
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getMyFollowUsersPost()
  },
  methods: {
    /**
     * 自分のフォローしているユーザーの投稿を取得する.
     */
    async getMyFollowUsersPost() {
      const response = await axios.get(
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
