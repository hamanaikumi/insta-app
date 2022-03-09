<template>
  <div>
    <div class="flex w-full my-1">
      <div class="w-1/4 flex justify-center flex-none self-center">
        <button type="button" @click="jumpUserPage(user.userId)">
          <img :src="user.icon" class="rounded-full w-16 h-16" alt="" />
        </button>
      </div>
      <div class="flex-grow self-center">
        <button type="button" @click="jumpUserPage(user.userId)">
          {{ user.userName }} <br />
        </button>
      </div>
      <div class="flex-none self-center">
        <button
          v-if="followButton"
          key="followbutton"
          type="button"
          class="text-white bg-accent-color w-24 h-8 mx-2 rounded-md"
          @click="clickFollow"
        >
          {{ buttonName }}
        </button>
        <button
          v-if="followingButton"
          key="followingbutton"
          type="button"
          class="bg-gray-100 w-24 h-8 mx-2 rounded-md"
          @click="clickUnFollow"
        >
          {{ buttonName }}
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      buttonName: '',
      // フォロー用
      followUrl: 'https://api-instagram-app.herokuapp.com/follow',
      // フォロー解除用
      unfollowUrl: 'https://api-instagram-app.herokuapp.com/unfollow',
      // フォローフォロワー一覧
      followInfoUrl: 'https://api-instagram-app.herokuapp.com/followinfo/',
      // ログインユーザーID
      userId: '',
      // FollowFollowingボタン
      followButton: false,
      followingButton: true,
      //
      searchUserId: '',
      //
    }
  },
  props: {
    user: Object,
  },

  created() {
    // ログインしているユーザーIDを取得.
    this.userId = this.$store.getters['user/getLoginUserId']
    if (this.userId === this.user.userId) {
      this.followButton = false
      this.followingButton = false
    } else if (this.user.follower.includes(this.userId)) {
      this.followButton = false
      this.followingButton = true
      this.buttonName = 'Following'
    } else {
      this.followButton = true
      this.followingButton = false
      this.buttonName = 'Follow'
    }
  },

  methods: {
    // フォローする
    clickFollow() {
      // this.reCreated()
      this.$axios
        .$post(this.followUrl, {
          userId: this.userId,
          targetUserId: this.user.userId,
        })
        .then((res) => console.log(res))

      this.followButton = false
      this.followingButton = true
      this.buttonName = 'Following'
    },
    // フォロー解除
    clickUnFollow() {
      // this.reCreated()

      this.$axios
        .$post(this.unfollowUrl, {
          userId: this.userId,
          targetUserId: this.user.userId,
        })
        .then((res) => console.log(res))
      this.followButton = true
      this.followingButton = false
      this.buttonName = 'Follow'
    },
    /**
     * リンク先が自分のプロフィールの場合とリンク先を分ける.
     *
     * @param targetId - リンク先のユーザーid
     */
    jumpUserPage(targetId: number) {
      if (Number(this.userId) === targetId) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/userPage/' + targetId)
      }
    },
  },
})
</script>
