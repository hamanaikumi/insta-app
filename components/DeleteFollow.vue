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
      button: 'Remove',
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
          this.button = 'Following'
        } else {
          this.button = 'Follow'
        }
      }
    },
  },
  created() {
    // ログイン中ユーザーが対象ユーザーをフォローしているか判定
    if (this.myFollowLists.length === 0) {
      this.isFollowing = false
    } else {
      for (const myFollowList of this.myFollowLists) {
        if (this.followUserId === myFollowList) {
          this.isFollowing = true
          break
        } else {
          this.isFollowing = false
        }
      }
    }

    console.log(this.myFollowLists)

    // 他人のフォロー・フォロワー一覧画面の時の初期表示
    if (this.statusId === 3 || this.statusId === 4) {
      if (this.myUserId === this.followUserId) {
        this.displayButton = false
      }
      if (this.isFollowing === true) {
        this.button = 'Following'
      } else {
        this.button = 'Follow'
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
        if (this.button === 'Remove') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'Follow'
        } else if (this.button === 'Follow') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = 'Remove'
        }
      }
      // 自分のフォロワー画面での処理
      if (this.statusId === 2) {
        if (this.button === 'Remove') {
          this.$emit('deleteFollower')
          if (this.isFollowing === true) {
            this.button = 'Following'
          } else {
            this.button = 'Follow'
          }
        } else if (this.button === 'Following') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'Follow'
        } else if (this.button === 'Follow') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = 'Following'
        }
      }
      // 他人のフォロー・フォロワー画面での処理
      if (this.statusId === 3 || this.statusId === 4) {
        if (this.button === 'Following') {
          this.$emit('deleteFollow')
          this.isFollowing = false
          this.button = 'Follow'
        } else if (this.button === 'Follow') {
          this.$emit('follow')
          this.isFollowing = true
          this.button = 'Following'
        }
      }
    },
  },
})
</script>

<style></style>
