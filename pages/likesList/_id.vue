<template>
  <div>
    Likes
    <br />
    <div class="pt-2">
      <div
        v-for="userInfo of likesUserInfoList"
        :key="userInfo.userId"
        class="follow-user-list flex flex-row items-center p-2"
      >
        <div class="follow-user-icon w-3/12" type="button">
          <nuxt-link :to="'/UserPage/' + userInfo.userId">
            <img :src="userInfo.icon" class="w-16 h-16 rounded-full" />
          </nuxt-link>
        </div>
        <div class="follow-user-name w-6/12 text-left" type="button">
          <nuxt-link :to="'/UserPage/' + userInfo.userId">
            {{ userInfo.userName }}
          </nuxt-link>
        </div>

        <!-- <div class="delete-follow ml-auto">
          <DeleteFollow
            :status-id="statusId"
            :my-follow-lists="myFollowLists"
            :follow-user-id="followUserInformation.userId"
            :my-user-id="myUserId"
            @deleteFollow="deleteFollow(followUserInformation.userId)"
            @deleteFollower="deleteFollower(followUserInformation.userId)"
            @follow="addFollow(followUserInformation.userId)"
          ></DeleteFollow>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  data() {
    return {
      // いいねしたユーザーの名前
      likesUserNameList: [],

      // いいねしたユーザーの情報リスト
      likesUserInfoList: [] as any,

      // ログイン中のユーザーID
      myUserId: 0,
    }
  },

  async created() {
    //
    this.likesUserNameList =
      this.$store.getters['likesList/getLikesUserNameList']

    const res = await axios.get(
      'https://api-instagram-app.herokuapp.com/allusers'
    )
    const allUserInfo = res.data

    for (const userName of this.likesUserNameList) {
      // const results: any = []
      const result = allUserInfo.find(
        (userInfo: any) => userInfo.userName === userName
      )
      this.likesUserInfoList.push(result)
    }
  },
  methods: {
    /**
     * フォローの表示を1減らす.
     */
    // deleteFollowNumber() {
    //   this.numberOfFollow--
    // },
    /**
     * フォロワーの表示を1減らす.
     */
    // deleteFollowerNumber() {
    //   this.numberOfFollower--
    // },
    /**
     * フォローの表示を1増やす.
     */
    // addFollowNumber() {
    //   this.numberOfFollow++
    // },
  },
})
</script>

<style></style>
