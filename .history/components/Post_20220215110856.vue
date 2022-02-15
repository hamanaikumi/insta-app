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
import PostModal from '../components/PostModal.vue'
export default Vue.extend({
  components: { PostModal },
  props: {
    postInformations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // Modal画面の表示の有無
      showContent: false,

      // 親(ここ)から子(モーダルComponent)にpostIDを渡すための変数
      postId: 0,
    }
  },
  methods: {
    /**
     * モーダルウィンドウで投稿詳細画面を表示する.
     */
    openModal(postId: number) {
      this.postId = postId
      // this.postId = クリックした投稿のpostIDをthis.postIdに代入
      this.showContent = true
    },
    /**
     * モーダルウィンドウの投稿詳細画面を閉じる.
     */
    closeModal() {
      this.showContent = false
    },
  },
})
</script>

<style></style>
