<template>
  <div>
    <div
      v-if="hasPost === true"
      class="post-contents flex flex-wrap justify-between"
    >
      <div
        v-for="postInformation of postInformations"
        :key="postInformation.postId"
        class="w-33/100 mt-px relative"
      >
        <nuxt-link :to="`/postDetail/${postInformation.postId}`">
          <img :src="postInformation.imageUrl[0]"
        /></nuxt-link>
        <div
          v-if="multipleImages(postInformation.imageUrl)"
          class="absolute top-1 right-1.5"
        >
          <i class="far fa-images text-white"></i>
        </div>
      </div>
    </div>
    <div
      v-if="hasPost === false"
      class="text-center pt-5 text-xl text-gray-600"
    >
      投稿がありません
    </div>
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
  methods: {
    multipleImages(images: []) {
      if (images.length > 1) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>

<style></style>
