<template>
  <article>
    <div
      class="article-container"
      v-for="post of followingPostList"
      v-bind:key="post.postId"
    >
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
    return {
      // 現在ログインしているユーザー情報
      loginUser: [],
      // 自分のフォローしている人の投稿一覧
      followingPostList: [],
      // フォローしている人のユーザーID
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
    this.$store.commit('sample/getPostByFollowingUserId')
    this.followingPostList =
      this.$store.getters['sample/getFollowingUserPostList']
    console.dir(
      'フォローしている人の投稿' + JSON.stringify(this.followingPostList)
    )
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
