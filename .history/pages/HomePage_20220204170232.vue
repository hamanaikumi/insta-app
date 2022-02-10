<template>
  <article>
    <div v-for="post of posts" v-bind:key="post" class="article-container">
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
    }
  },

  computed: {
    /**
     * 現在ログインしているユーザー情報を取得.
     * @reuturs ログインしているユーザー情報
     */
    getLoginUser(): any {
      return this.$store.getters['sample/getLoginUser']
    },
  },

  created() {
    // 取得した路銀情報dataに代入
    this.loginUser = this.getLoginUser()
    console.log(' this.loginUser ' + this.loginUser)

    this.$store.commit('sample/getPostByMyUserId')
    console.dir(
      'stateのMyPostList' +
        JSON.stringify(this.$store.commit('sample/getPostByMyUserId'))
    )
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
