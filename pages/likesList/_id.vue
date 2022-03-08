<template>
  <div class="container box-border p-5">
    <hr />
    <div class="tab-content">
      <!-- いいねしたユーザーリスト -->
      <Follow
        :follow-user-informations="likesUserInfoList"
        :is-follow="false"
        :is-my-list="isMyList"
        :my-user-id="myUserId"
      ></Follow>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Follow from '~/components/Follow.vue'

export default Vue.extend({
  components: { Follow },
  data() {
    return {
      // いいねしたユーザーの名前
      likesUserNameList: [],

      // いいねしたユーザーの情報リスト
      likesUserInfoList: [] as any,

      // 自分のフォローフォロワーリストか否か
      isMyList: false,
      // ログイン中のユーザーID
      myUserId: 0,
    }
  },

  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },

  async created() {
    // ログイン中のユーザーID 取得
    this.myUserId = this.$store.getters['user/getLoginUserId']

    // いいねしたユーザー名取得
    this.likesUserNameList =
      this.$store.getters['likesList/getLikesUserNameList']

    // いいねしたユーザー名からユーザー情報を検索してユーザー情報を取得
    const res = await axios.get(
      'https://api-instagram-app.herokuapp.com/allusers'
    )
    const allUserInfo = res.data

    for (const userName of this.likesUserNameList) {
      const result = allUserInfo.find(
        (userInfo: any) => userInfo.userName === userName
      )
      this.likesUserInfoList.push(result)
    }
  },
})
</script>

<style></style>
