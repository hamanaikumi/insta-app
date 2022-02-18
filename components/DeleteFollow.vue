<template>
  <div>
    <button
      v-if="displayButton"
      class="text-xs bg-transparent text-black font-semibold py-1 px-2 border border-gray-300 rounded"
      type="button"
      @click="onClickButton()"
    >
      {{ button }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    // 状態ごとの番号
    statusId: {
      type: Number,
      required: true,
    },
    // ログイン中ユーザーがフォローしている人のid一覧
    myFollowLists: {
      type: Array as PropType<number[]>,
      required: true,
    },
    // 対象のユーザーid（現在表示されているユーザー）
    followUserId: {
      type: Number,
      required: true,
    },
    // ログイン中のユーザーid
    myUserId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // ボタンに表示される文字
      button: '削除',
      // ボタンの表示を切り替える変数
      displayButton: true,
      // ログイン中のユーザーがフォローしているかを表すフラグ
      isFollowing: true,
    }
  },
  watch: {
    statusId() {
      // 他人のフォロー・フォロワー一覧画面の時の初期表示
      if (this.statusId === 3 || this.statusId === 4) {
        if (this.myUserId === this.followUserId) {
          this.displayButton = false
        }
        if (this.isFollowing === true) {
          this.button = 'フォロー中'
        } else {
          this.button = 'フォローする'
        }
      }
    },
  },
  created() {
    // ログイン中ユーザーが対象ユーザーをフォローしているか判定
    for (const myFollowList of this.myFollowLists) {
      if (this.followUserId === myFollowList) {
        this.isFollowing = true
        break
      } else {
        this.isFollowing = false
      }
    }

    // 他人のフォロー・フォロワー一覧画面の時の初期表示
    if (this.statusId === 3 || this.statusId === 4) {
      if (this.myUserId === this.followUserId) {
        this.displayButton = false
      }
      if (this.isFollowing === true) {
        this.button = 'フォロー中'
      } else {
        this.button = 'フォローする'
      }
    }
  },
  methods: {
    /**
     * ボタンが押された際に条件によって発火させるメソッドを変える.
     */
    onClickButton() {
      // 自分のフォロー画面での処理
      if (this.statusId === 1) {
        if (this.button === '削除') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'フォローする'
        } else if (this.button === 'フォローする') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = '削除'
        }
      }
      // 自分のフォロワー画面での処理
      if (this.statusId === 2) {
        if (this.button === '削除') {
          this.$emit('deleteFollower')
          if (this.isFollowing === true) {
            this.button = 'フォロー中'
          } else {
            this.button = 'フォローする'
          }
        } else if (this.button === 'フォロー中') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'フォローする'
        } else if (this.button === 'フォローする') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = 'フォロー中'
        }
      }
      // 他人のフォロー・フォロワー画面での処理
      if (this.statusId === 3 || this.statusId === 4) {
        if (this.button === 'フォロー中') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'フォローする'
        } else if (this.button === 'フォローする') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = 'フォロー中'
        }
      }
    },
  },
})
</script>

<style></style>
