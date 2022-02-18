<template>
  <div class="container mt-5 box-border p-5">
    <div class="post-container">
      <PostDetail :give-post-id="postId"></PostDetail>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      // postID
      postId: 0,
    }
  },

  created() {
    // パラメーターよりpostID取得
    this.postId = parseInt(this.$route.params.id)
  },
})
</script>

<style scoped lang="scss">
.post-container {
  width: 100%;
  padding: 0.63rem;
}
</style>
