<template>
  <section>
    <div id="content">
      <button type="button" @click="closeModal()">とじる</button>
      <div v-for="comment of comments" :key="comment.id">
        <div class="flex">
          <div>
            <img src="" alt="" class="h-6 w-6 rounded-full object-cover" />
          </div>
          <!-- <div class="ml-2">{{ comment }}</div> -->
        </div>
        <div class="c-comment font-extralight">
          {{ comment }}
        </div>
      </div>
      <div class="text-xs text-light-gray">{{ errorMsg }}</div>
      <input
        v-model="inputComment"
        class="appearance-none bg-gray-100 border-none focus:outline-none px-5"
        type="text"
      />
      <button type="button" class="text-accent-color" @click="addComment()">
        Post
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
type commentInfo = {
  comment: String
  userId: Number
  userName: String
  userIconUrl: String
}
export default Vue.extend({
  props: {
    getPostId: { type: Number, required: true },
  },
  data() {
    return {
      // 入力されたコメント
      inputComment: '',
      // コメント入力エラーメッセージ
      errorMsg: '',

      // 現在の投稿のコメント一覧
      comments: [],

      // コメントした人のユーザー情報
      // commentInfo: {
      //   comment: '',
      //   userId: 0,
      //   userName: '',
      //   userIconUrl: '',
      // },
    }
  },
  created() {
    this.getComment()
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
      if (this.inputComment === '') {
        this.errorMsg = 'コメントを入力してください'
        return
      }
      console.dir(
        '現在ログインしているユーザー情報' +
          this.$store.getters['user/getLoginUserId'] +
          this.$store.getters['user/getLoginUserName']
      )
      await axios.post('https://api-instagram-app.herokuapp.com/comment', {
        postId: this.getPostId,
        userId: this.$store.getters['user/getLoginUserId'],
        comment: this.inputComment,
      })
      // コメント入力欄初期化
      this.inputComment = ''
      // コメント一覧更新
      this.getComment()
    },
    /**
     * コメント一覧を取得する.
     */
    async getComment() {
      const response = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.getPostId}`
      )
      // 現在のコメント一覧
      const comments = response.data.comments
      for (const comment of comments) {
        console.log('コメント内容' + comment.userinfo.userName)
      }
      console.dir('コメント一覧' + JSON.stringify(comments))
      console.dir('コメント一覧' + JSON.stringify(comments.userinfo))
      // コメントのユーザー情報
      // const commentUserInfo = response.data.userinfo

      // type commentInfo = {
      //   comment: comment.comment
      //   userId: Number
      //   userName: String
      //   userIconUrl: String
      // }
    },
  },
})
</script>

<style scoped lang="scss">
#content {
  z-index: 10;
  width: 100%;
  min-height: 30vh;
  max-width: 428px;
  margin: 0 auto;
  background-color: white;
}

.c-comment {
  padding: 0.5rem;
  border-bottom: 0.3px solid #b3b3b3;
}
</style>
