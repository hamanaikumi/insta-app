<template>
  <div>
    <div
      v-if="hasPost === true"
      class="post-contents w-full grid grid-cols-3 gap-x-px"
    >
      <div
        v-for="post of posts"
        :key="post.postId"
        class="mt-px flex justify-center relative"
      >
        <nuxt-link :to="`/postDetail/${post.postId}`">
          <img :src="post.imageUrl[0]"
        /></nuxt-link>
        <div
          v-if="multipleImages(post.imageUrl)"
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
      No posts
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
      posts: [] as any[],
    }
  },
  watch: {
    postInformations() {
      this.hasPost = true
      if (this.postInformations.length === 0) {
        this.hasPost = false
      }
      this.posts = Array.from(this.postInformations)
      this.posts.sort(function (a, b) {
        return a.postData < b.postData ? 1 : -1
      })
      console.dir(JSON.stringify(this.postInformations))
      console.dir(JSON.stringify(this.posts))
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
