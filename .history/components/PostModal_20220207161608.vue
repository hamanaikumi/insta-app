<template>
  <section>
    <div id="overlay" v-on:click="closeModal()">
      <div id="content">
        PostDetailが入る
        <!-- <PostDetail></PostDetail> -->
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import PostDetail from '../components/PostDetail.vue'
export default Vue.extend({
  components: [PostDetail],
  // //   props: {
  // //     postId,
  // //   },

  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
  //   // let closeModal = () => {
  //   //   context.emit("close");
  //   // };
})
</script>

<style scoped></style>
