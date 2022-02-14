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

import PostDetail from '../components/PostDetail.vue'
export default {
  components: { PostDetail },

  data() {
    return {
      // 現在ログインしているユーザー情報
      loginUser: [],
      // 自分の投稿一覧
      myPostList: [],
    }
  },

  // methods: {
  //   getStore() {},
  // },

  created() {
    this.loginUser = this.$store.getters['sample/getLoginUser']
    this.$store.commit('sample/getPostByMyUserId')

    this.$store = this.$store.getters['sample/getPostByMyUserId']
  },
}
</script>
<style scoped>
article {
  padding: 0.63rem;
}
.article-container {
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
