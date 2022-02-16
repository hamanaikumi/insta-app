<template>
  <div>
    <div class="flex w-screen my-1">
      <div class="w-1/4 flex justify-center flex-none self-center">
        <router-link :to="'/mypage/' + user.userId">
          <img :src="user.icon" class="rounded-full w-16 h-16" alt="" />
        </router-link>
      </div>
      <div class="flex-grow self-center">
        <router-link :to="'/mypage/' + user.userId">
          {{ user.userName }} <br />
        </router-link>
      </div>
      <div class="flex-none self-center">
        <button
          v-if="followButton"
          key="followbutton"
          type="button"
          class="bg-green-500 w-24 h-8 mx-2 rounded-md"
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
      // 仮のログインユーザーID
      userId: 3,
      // 相手のユーザーID:this.user.userId,

      followButton: false,
      followingButton: true,
    }
  },
  props: {
    user: Object,
  },

  mounted() {
    console.log('子:mounted')

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
    // 検索押した時に更新する用
    recreated() {
      console.log('子:呼ばれた！！！recreated')

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

    // フォローする
    clickFollow() {
      this.$axios
        .$post(this.followUrl, {
          userId: this.userId,
          targetUserId: this.user.userId,
        })
        .then((res) => console.log(res))

      this.followButton = false
      this.followingButton = true
      this.buttonName = 'Following'
      console.log('Follow:' + this.userId + '→' + this.user.userId)
    },
    // フォロー解除
    clickUnFollow() {
      this.$axios
        .$post(this.unfollowUrl, {
          userId: this.userId,
          targetUserId: this.user.userId,
        })
        .then((res) => console.log(res))
      this.followButton = true
      this.followingButton = false
      this.buttonName = 'Follow'
      console.log('Follow解除:' + this.userId + '→' + this.user.userId)
    },
  },
})
</script>
