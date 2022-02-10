<template>
  <section>
    <div id="overlay" v-on:click="closeModal()">
      <div id="content">PostDetailが入る</div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    postId: number,
  },

  // let closeModal = () => {
  //   context.emit("close");
  // };
})
</script>

<style scoped></style>
