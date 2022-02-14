<template>
  <section>
    <div id="overlay">
      <button type="button" @click="closeModal()">閉じる</button>
      <div id="content" v-for="comment of getComments" v-bind:key="comment">
        <div>{{ comment.comment }}</div>
        <input
          v-model="inputComment"
          class="appearance-none bg-gray-100 border-none focus:outline-none px-3"
          type="text"
        />

        <button type="button">comment</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    getComments: {},
  },
  data() {
    return {
      inputComment: '',
    }
  },
  created() {
    console.dir('コメント取得かくにん' + JSON.stringify(this.getComments))
  },

  methods: {
    /**
     * コメントモーダルウィンドを閉じる
     */
    closeModal() {
      this.$emit('commentClose')
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
