<template>
  <div class="post-contents flex -ml-0.5">
    <div
      v-for="postInformation of postInformations"
      :key="postInformation.postId"
      class="w-1/3 mt-0.5 ml-0.5"
    >
      <!-- ここのリンクは後ほど変更 -->
      <nuxt-link :to="`/PostDetail/${postInformation.postId}`"
        ><img :src="postInformation.imageUrl[0]"
      /></nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    postInformations: {
      type: Array as PropType<any>,
      required: true,
    },
  },
})
</script>

<style></style>
