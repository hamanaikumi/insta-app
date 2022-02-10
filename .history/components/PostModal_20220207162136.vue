<template>
  <section>
    <div id="overlay" @click="closeModal()">
      <div id="content">
        <PostDetail></PostDetail>
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
})
</script>

<style scoped>
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(156, 174, 183, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0.6s;
}
#content {
  z-index: 2;
  width: 55%;
  padding: 2em;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);
}
</style>
