<template>
  <section>
    <div id="overlay">
      <button type="button" @click="closeModal()">閉じる</button>
      <div id="content">
        <div v-for="comment of getComments" :key="comment.id">
          {{ comment.comment }}
        </div>
        <input
          v-model="inputComment"
          class="appearance-none bg-gray-100 border-none focus:outline-none px-3"
          type="text"
        />

        <button type="button" @click="addComment()">comment</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  props: {
    // getComments: {},
    getPostId: Number,
  },
  data() {
    return {
      // 入力されたコメント
      inputComment: '',

      // 現在の投稿のコメント一覧
      comments: [],
    }
  },
  async created() {
    // console.dir('コメント取得かくにん' + JSON.stringify(this.getComments))
    console.log('postID' + this.getPostId)

    const response = await axios.get(
      `https://api-instagram-app.herokuapp.com/postdetail/${this.getPostId}`
    )
    this.comments = response.data.commnets
  },

  methods: {
    /**
     * コメントモーダルウィンドを閉じる
     */
    closeModal() {
      this.$emit('commentClose')
    },
    /**
     * コメントを追加する.
     */
    async addComment(): Promise<void> {
      console.log('コメント追加メソット発動')
      await axios.post('https://api-instagram-app.herokuapp.com/comment', {
        postId: this.getPostId,
        userId: this.$store.getters['user/getLoginUserId'],
        comment: this.inputComment,
      })
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
