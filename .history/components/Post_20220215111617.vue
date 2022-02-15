<template>
  <div class="post-contents flex -ml-0.5">
    <div
      v-for="postInformation of postInformations"
      :key="postInformation.postId"
      class="w-1/3 mt-0.5 ml-0.5"
    >
      <!-- ここのリンクは後ほど変更 -->
      <!-- <nuxt-link :to="`/PostDetail/${postInformation.postId}`"> -->
      <img
        :src="postInformation.imageUrl[0]"
        @click="openModal(postInformation.postId)"
      />
      <!-- </nuxt-link> -->
    </div>
    <transition name="fade">
      <PostModal
        v-if="showContent"
        :get-post-id="postId"
        @close="closeModal()"
      ></PostModal>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostModal from '../components/PostModal.vue'
export default Vue.extend({
  components: { PostModal },
  props: {
    postInformations: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style></style>
