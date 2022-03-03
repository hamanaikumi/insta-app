<template>
  <div>
    <!-- posts skeleton screen -->
    <div v-if="skeleton" class="animate-pulse w-full grid grid-cols-3 gap-x-px">
      <div
        v-for="i of 9"
        :key="i"
        class="mt-px flex justify-center bg-gray-200 w-32 h-32"
      ></div>
    </div>
    <!-- 投稿一覧 -->
    <div
      v-if="hasPost === true && !skeleton"
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
    <!-- 投稿がない時の表示 -->
    <div
      v-if="hasPost === false && !skeleton"
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
    // ユーザーの投稿一覧
    postInformations: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  data() {
    return {
      // 投稿あり：true,投稿なし：false
      hasPost: true,
      // 投稿日時の降順に並べ替えた投稿一覧
      posts: [] as any[],
      // スケルトンスクリーン
      skeleton: true,
    }
  },
  watch: {
    // 投稿の有無を判断し、投稿日時の降順に並び替え新しい配列に格納
    postInformations() {
      this.hasPost = true
      if (this.postInformations.length === 0) {
        this.hasPost = false
      }
      this.posts = Array.from(this.postInformations)
      this.posts.sort(function (a, b) {
        return a.postData < b.postData ? 1 : -1
      })
      this.skeleton = false
    },
  },
  created() {
    if (this.postInformations.length === 0) {
      this.hasPost = false
    }
  },
  methods: {
    /**
     * 複数投稿の際に画像にアイコンをつける.
     *
     * @param images - イメージURLの配列
     * @returns 複数画像：true、単独画像：false
     */
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
