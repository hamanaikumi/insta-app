<template>
  <section>
    <div id="content">
      <button type="button" @click="closeModal()">とじる</button>
      <div v-for="comment of commentList" :key="comment.id">
        <div class="flex">
          <div>
            <img
              :src="comment.userIconUrl"
              alt=""
              class="h-6 w-6 rounded-full object-cover"
            />
          </div>
          <div class="ml-2">{{ comment.userName }}</div>
        </div>
        <div class="c-comment font-extralight">
          {{ comment.comment }}
        </div>
        <div class="font-extralight">{{ comment.commentDate }}</div>
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
import moment from 'moment'

// npm install date-fns --save
// import { format } from 'date-fns'

// コメント情報
type commentInfo = {
  comment: String
  commentDate: Object
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
      // eslint-disable-next-line no-array-constructor
      commentList: new Array(),
    }
  },
  created() {
    // コメント一覧を取得する
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

      // コメントが未入力だとコメントできない
      if (this.inputComment === '') {
        this.errorMsg = 'コメントを入力してください'
        return
      }
      // コメントをAPIにpost

      const LOGIN_USER_ID = this.$store.getters['user/getLoginUserId']

      await axios.post('https://api-instagram-app.herokuapp.com/comment', {
        postId: this.getPostId,
        userId: LOGIN_USER_ID,
        comment: this.inputComment,
      })
      // コメント入力欄初期化
      this.inputComment = ''
      // コメント一覧更新
      this.commentList = []
      this.getComment()
    },
    /**
     * コメント一覧を取得してオブジェクトをpush.
     */

    async getComment() {
      const response = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.getPostId}`
      )
      // 現在のコメント一覧を取得
      const resComments = response.data.comments
      // コメントとそのユーザー情報を一つずつsthis.commentListに格納
      for (const comment of resComments) {
        console.log('format前:' + comment.commentDate)
        const formatDate = moment(comment.commentDate).format(
          'yyyy-MM-DD HH:mm:ss'
        )

        const commentInfo: commentInfo = {
          comment: comment.comment,
          commentDate: moment(formatDate).fromNow(),
          userId: comment.userInfo.userId,
          userName: comment.userInfo.userName,
          userIconUrl: comment.userInfo.icon,
        }
        this.commentList.push(commentInfo)
      }
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
  // border-bottom: 1px solid #8a8a8a;
}
</style>
