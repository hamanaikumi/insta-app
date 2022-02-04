<template>
  <div class="top-wrapper">
    <div class="user-information">
      <div class="icon">
        <img v-bind:src="userInformation.icon" />
      </div>
      <div class="follow-information">
        <div class="posts-number">
          <p>{{ myPost.length }}</p>
          <p>投稿数</p>
        </div>
        <div class="folower-number">
          <p>{{ userInformation.follower.length }}</p>
          <p>フォロワー</p>
        </div>
        <div class="folow-number">
          <p>{{ userInformation.follow.length }}</p>
          <p>フォロー</p>
        </div>
      </div>
      <div class="bio-contents">
        <p>{{ userInformation.userName }}</p>
        <p>{{ userInformation.bio }}</p>
      </div>
    </div>
    <div class="contents"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInformation: {},
      myPost: [],
    }
  },
  created() {
    const users = this.$store.getters['sample/getUserInformation']
    this.userInformation = users[1]
    const posts = this.$store.getters['sample/getPostInformation']
    this.myPost = posts.filter(
      (post) => post.userId === this.userInformation.userId
    )
  },
}
</script>

<style></style>
