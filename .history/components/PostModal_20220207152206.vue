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
  data() {
    return {
      postId: number,
    }
  },
  props: {
    postId= this.postId,
  },

  // let closeModal = () => {
  //   context.emit("close");
  // };
})
</script>

<style scoped></style>
