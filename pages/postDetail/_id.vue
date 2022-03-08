<template>
  <div class="container mt-5 box-border p-5">
    <div class="post-container w-full">
      <PostDetail :give-post-id="postId"></PostDetail>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  data() {
    return {
      // postID
      postId: 0,
    }
  },

  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },

  created() {
    // パラメーターよりpostID取得
    this.postId = parseInt(this.$route.params.id)
  },
})
</script>

<style scoped lang="scss"></style>
