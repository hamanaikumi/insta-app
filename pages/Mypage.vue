<template>
  <div class="top-wrapper mt-12 box-border p-5">
    <div class="user-information">
      <div class="icon-follow flex flex-row items-center justify-between">
        <div class="icon">
          <img
            v-bind:src="userInformation.icon"
            class="w-20 h-20 rounded-full"
          />
        </div>
        <div class="follow-information w-2/4 flex flex-row justify-between">
          <div class="posts-number text-center p-1">
            <span class="font-medium">{{ myPost.length }}</span>
            <br />
            <span class="text-xs">投稿数</span>
          </div>
          <div class="folower-number text-center p-1">
            <span class="font-medium">{{
              userInformation.follower.length
            }}</span>
            <br />
            <span class="text-xs">フォロワー</span>
          </div>
          <div class="folow-number text-center p-1">
            <span class="font-medium">{{ userInformation.follow.length }}</span>
            <br />
            <span class="text-xs">フォロー</span>
          </div>
        </div>
      </div>
      <div class="bio-contents py-2.5">
        <span class="font-medium">{{ userInformation.userName }}</span>
        <br />
        <span class="text-sm">{{ userInformation.bio }}</span>
      </div>
    </div>
    <div class="contents-icon flex h-10 items-center">
      <div class="w-1/2 text-center">
        <i class="fas fa-border-all"></i>
      </div>
      <div class="w-1/2 text-center">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    </div>
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
