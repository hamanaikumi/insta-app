<template>
  <div>
    <div v-if="hasPost === true" class="post-contents flex -ml-0.5">
      <div
        v-for="postInformation of postInformations"
        :key="postInformation.postId"
        class="w-1/3 mt-0.5 ml-0.5"
      >
        <nuxt-link :to="`/PostDetail/${postInformation.postId}`">
          <img :src="postInformation.imageUrl[0]"
        /></nuxt-link>
      </div>
    </div>
    <div v-if="hasPost === false">投稿がありません</div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    postInformations: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  data() {
    return {
      hasPost: true,
    }
  },
  watch: {
    postInformations() {
      this.hasPost = true
      if (this.postInformations.length === 0) {
        this.hasPost = false
      }
    },
  },
  created() {
    if (this.postInformations.length === 0) {
      this.hasPost = false
    }
  },
})
</script>

<style></style>
