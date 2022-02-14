<template>
  <section>
    <div class="post-img" v-on:click="openModa()">post</div>
    <transition name="fade">
      <Modal v-if="showContent" v-on:close="closeModal()"></Modal>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      showContent: false,
    }
  },
  methods: {
    /**
     * モーダルウィンドウを表示する.
     */
    openModa() {
      this.showContent = true
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
</style>
