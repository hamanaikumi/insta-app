<template>
  <section>
    <div class="post-img" @click="openModal(item.postId)">post</div>
    <transition name="fade">
      <PostModal
        v-if="showContent"
        :get-post-id="postId"
        @close="closeModal()"
      ></PostModal>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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

<style scoped>
.post-img {
  width: 124px;
  height: 124px;
  padding: 2rem;
  border: 1px solid black;
}
/*モーダルの出現スピード htmlの<transition > にて*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
