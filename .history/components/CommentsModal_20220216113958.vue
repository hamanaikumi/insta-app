<template>
  <section>
    <div id="content">
      <div class="relative">
        <button type="button" @click="closeModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="c-comments">
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
          <div class="c-comment font-extralight p-px pb-0">
            {{ comment.comment }}
          </div>
          <!-- font-extralight -->
          <div class="pb-0.5 text-xs">
            {{ comment.commentDate }}
          </div>
        </div>
      </div>
      <div class="c-input absolute bottom-0">
        <div class="text-xs text-light-gray">{{ errorMsg }}</div>
        <input
          v-model="inputComment"
          class="appearance-none bg-gray-100 border-none focus:outline-none px-5 w-10/12"
          type="text"
        />
        <button type="button" class="text-accent-color" @click="addComment()">
          Post
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
// npm install moment --save
import moment from 'moment'

// コメント情報 型
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

      // コメント一覧初期化と更新
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

      // コメントとそのユーザー情報を一つずつthis.commentListに格納
      for (const comment of resComments) {
        // 日付フォーマット moment.utc().format() 日本時間に変換してる感じ？
        // eslint-disable-next-line import/no-named-as-default-member
        const formatDate = moment
          .utc(comment.commentDate)
          .format('yyyy-MM-DD HH:mm:ss')

        // オブジェクト化  (Date: moment().fromNow() で何分前の形式で表示できるメソッド)
        const commentInfo: commentInfo = {
          comment: comment.comment,
          commentDate: moment(formatDate, 'YYYY/MM/DD HH:mm:S').fromNow(),
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
  min-height: 20vh;
  max-width: 428px;
  margin: 0 auto;
  background-color: white;
  .c-comment {
    font-weight: 200;
  }
}
</style>
