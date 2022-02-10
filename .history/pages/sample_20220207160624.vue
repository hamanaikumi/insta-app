<template>
  <div class="post-img" v-on:click="">post</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){

    }
  methods: {
       /**
     * モーダルウィンドウを表示する.
     */
    openModa(){
      this.showContent = true;
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
