<template>
  <section>
    <div class="post-img" @click="openModa()">post</div>
    <transition name="fade">
      <PostModal v-if="showContent" @close="closeModal()"></PostModal>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      // Modalの表示の有無
      showContent: false,

      // 親(ここ)から子(モーダルComponent)にpostIDを渡すための変数
      getPostId !<number>:
    }
  },
  methods: {
    /**
     * モーダルウィンドウを表示する.
     */
    openModa() {
      this.showContent = true
    },
    /**
     * モーダルウィンドウを閉じる.
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
