<template>
  <section>
    <div id="content">
      <div class="flex flex-row-reverse">
        <button type="button" @click="closeModal()">
          <i class="fas fa-times text-light-gray"></i>
        </button>
      </div>

      <div
        v-for="comment of commentList"
        :key="comment.commentId"
        class="flex items-center justify-between"
      >
        <div>
          <div class="flex">
            <div>
              <button type="button" @click="jumpUserPage(comment.userId)">
                <img
                  :src="comment.userIconUrl"
                  alt=""
                  class="h-6 w-6 rounded-full object-cover"
                />
              </button>
            </div>
            <button type="button" @click="jumpUserPage(comment.userId)">
              <div class="ml-2">{{ comment.userName }}</div>
            </button>
          </div>
          <div class="c-comment font-light p-px pb-0">
            {{ comment.comment }}
          </div>
          <!-- font-extralight -->
          <div class="pb-0.5 text-xs font-light">
            {{ comment.commentDate }}
          </div>
        </div>
        <!-- コメント削除するボタン ログインユーザーの投稿orログインユーザーのしたコメントの時だけ -->
        <div>
          <button
            v-if="postUserId === loginUserId || comment.userId === loginUserId"
            type="button"
            @click="deleteComment(comment.commentId)"
          >
            <i class="far fa-trash-alt text-warning-color"></i>
          </button>
        </div>
      </div>

      <div class="py-1">
        <div class="text-xs text-light-gray">{{ errorMsg }}</div>
        <div class="c-input flex justify-around">
          <input
            v-model="inputComment"
            class="appearance-none bg-gray-100 border-none focus:outline-none px-2 w-10/12"
            type="text"
            :disabled="btnActive"
            @keydown.enter="addCommentByEnter"
          />

          <button
            type="button"
            class="text-accent-color content-center"
            :disabled="btnActive"
            @click="addComment()"
          >
            Post
          </button>
        </div>
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
  commentId: Number
  comment: String
  commentDate: Object
  userId: Number
  userName: String
  userIconUrl: String
}

export default Vue.extend({
  props: {
    // postIDを取得
    getPostId: { type: Number, required: true },
    // postの投稿者ユーザーのID
    postUserId: { type: Number, required: true },
  },
  data() {
    return {
      // 入力されたコメント
      inputComment: '',
      // コメント入力エラーメッセージ
      errorMsg: '',
      // ログインユーザー
      loginUserId: 0,
      // ボタンの無効化
      btnActive: false,

      // 現在の投稿のコメント一覧
      // eslint-disable-next-line no-array-constructor
      commentList: [] as any,
    }
  },

  created() {
    // コメント一覧を取得する
    this.getComment()
    // ログインユーザーID
    this.loginUserId = this.$store.getters['user/getLoginUserId']
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
      // ボタン無効化
      this.btnActive = true
      // コメントをAPIにpost
      const LOGIN_USER_ID = this.$store.getters['user/getLoginUserId']

      const response = await axios.post(
        'https://api-instagram-app.herokuapp.com/comment',
        {
          postId: this.getPostId,
          userId: LOGIN_USER_ID,
          comment: this.inputComment,
        }
      )
      if (response.data.status === 'success') {
        // コメント入力欄初期化
        this.inputComment = ''
        // コメント一覧初期化と更新
        this.errorMsg = ''
        this.commentList = []
        this.getComment()

        // ボタン有効化
        this.btnActive = false
      }
    },

    /**
     * EnterKeyでコメントを追加する.
     */
    async addCommentByEnter(e: any): Promise<void> {
      // 日本語入力中のEnterキーは無効
      if (e.keyCode === 229) return

      // コメントが未入力だとコメントできない
      if (this.inputComment === '') {
        this.errorMsg = 'コメントを入力してください'
        return
      }

      // ボタン無効化
      this.btnActive = true

      // コメントをAPIにpost
      const LOGIN_USER_ID = this.$store.getters['user/getLoginUserId']

      const response = await axios.post(
        'https://api-instagram-app.herokuapp.com/comment',
        {
          postId: this.getPostId,
          userId: LOGIN_USER_ID,
          comment: this.inputComment,
        }
      )
      if (response.data.status === 'success') {
        // コメント入力欄初期化
        this.inputComment = ''
        // コメント一覧初期化と更新
        this.errorMsg = ''
        this.commentList = []
        this.getComment()

        // ボタン有効化
        this.btnActive = false
      }
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
        // eslint-disable-next-line import/no-named-as-default-member

        // オブジェクト化  (Date: moment().fromNow() で何分前の形式で表示できるメソッド)
        const commentInfo: commentInfo = {
          commentId: comment.commentId,
          comment: comment.comment,
          commentDate: moment(new Date(comment.commentDate)).fromNow(),
          userId: comment.userInfo.userId,
          userName: comment.userInfo.userName,
          userIconUrl: comment.userInfo.icon,
        }
        this.commentList.push(commentInfo)
      }

      // コメント数をpostDetailに渡す
      this.$emit('getCommentCount', this.commentList.length)
    },
    /**
     * コメントを削除する.
     */
    async deleteComment(id: any) {
      await this.$axios.$delete(
        'https://api-instagram-app.herokuapp.com/comment',
        { data: { commentId: id } }
      )
      // コメント一覧初期化と更新
      this.commentList = []
      this.getComment()
    },
    /**
     * リンク先が自分のプロフィールの場合とリンク先を分ける.
     *
     * @param targetId - リンク先のユーザーid
     */
    jumpUserPage(targetId: number) {
      if (this.loginUserId === targetId) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/userPage/' + targetId)
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
}
</style>
