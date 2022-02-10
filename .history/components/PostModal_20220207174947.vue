<template>
  <section>
    <div id="overlay" @click="closeModal()">
      <div id="content">
        {{ getPostId }}
        <PostDetail class="post-modal"></PostDetail>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PostDetail from '../components/PostDetail.vue'
export default Vue.extend({
  components: {
    PostDetail,
  },
  props: {
    getPostId,
  },
  data() {
    return {
      postId: getPostId,
    }
  },

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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0.6s;
}
#content {
  z-index: 2;
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);
}
.post-modal {
  background-color: white;
}
</style>
