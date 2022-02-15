<template>
  <div class="post-contents flex -ml-0.5">
    <div
      v-for="postInformation of postInformations"
      :key="postInformation.postId"
      class="w-1/3 mt-0.5 ml-0.5"
    >
      <!-- ここのリンクは後ほど変更 -->
      <!-- <nuxt-link :to="`/PostDetail/${postInformation.postId}`"> -->
      <div @click="openModal(postInformation.postId)">
        <img :src="postInformation.imageUrl[0]" />
      </div>
      <transition name="fade">
        <PostModal
          v-if="showContent"
          :get-post-id="postId"
          @close="closeModal()"
        ></PostModal>
      </transition>
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    postInformations: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style></style>
