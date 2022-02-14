<template>
  <div class="post-img" v-on:click="">post</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
       /**
     * モーダルウィンドウを表示する.
     */
    let openModal = () => {
      showContent.value = true;
    };
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
