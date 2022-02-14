<template>
  <section>
    <div id="overlay">
      <button type="button" @click="closeModal()">閉じる</button>
      <div id="content">コメント一覧</div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    getPostId: Number,
  },
  created: {},

  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
})
</script>

<style scoped lang="scss">
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 10;
  width: 100%;
  min-height: 80vh;
  max-width: 428px;
  margin: 0 auto;
  background-color: white;
}
</style>
