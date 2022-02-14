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
import store from './store'
export default {
  components: { PostDetail },

  data() {
    return {
      // 現在ログインしているユーザー情報
      loginUser: [],
      // 自分のフォローしている人の投稿一覧
      followingPostList: [],
    }
  },

  // methods: {
  //   getStore() {},
  // },

  created() {
    // loginユーザー情報格納
    this.loginUser = this.$store.getters['sample/getLoginUser']

    // 自分のフォローしているユーザーの投稿一覧

    // 自分の投稿一覧を自分のuserIdで絞り込んでいる
    store.commit('sample/getPostByFollowingUserId')
    this.followingPostList = store.getters['sample/getFollowingUserPostList']
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
