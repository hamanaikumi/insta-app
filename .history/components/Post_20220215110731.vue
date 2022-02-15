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
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postInformations: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
