<template>
  <div class="pt-2">
    <!-- follow skeleton screen -->
    <div v-if="skeleton">
      <div
        v-for="i of 8"
        :key="i"
        class="animate-pulse flex flex-row items-center p-2"
      >
        <div class="w-3/12">
          <div class="bg-gray-200 w-16 h-16 rounded-full"></div>
        </div>
        <div class="bg-gray-200 w-6/12 h-5 rounded"></div>
        <div class="ml-auto bg-gray-200 w-2/12 h-5 rounded"></div>
      </div>
    </div>
    <!-- end of skeleton screen -->
    <div v-if="!skeleton">
      <div
        v-for="followUserInformation of followUserInformations"
        :key="followUserInformation.userId"
        class="follow-user-list flex flex-row items-center p-2"
      >
        <button
          class="follow-user-icon w-3/12"
          type="button"
          @click="jumpUserPage(followUserInformation.userId)"
        >
          <img
            :src="followUserInformation.icon"
            class="w-16 h-16 rounded-full"
          />
        </button>
        <button
          class="follow-user-name w-6/12 text-left"
          type="button"
          @click="jumpUserPage(followUserInformation.userId)"
        >
          {{ followUserInformation.userName }}
        </button>

        <div class="delete-follow ml-auto">
          <DeleteFollow
            :status-id="statusId"
            :my-follow-lists="myFollowLists"
            :follow-user-id="followUserInformation.userId"
            :my-user-id="myUserId"
            @deleteFollow="deleteFollow(followUserInformation.userId)"
            @deleteFollower="deleteFollower(followUserInformation.userId)"
            @follow="addFollow(followUserInformation.userId)"
          ></DeleteFollow>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DeleteFollow from './DeleteFollow.vue'
export default Vue.extend({
  components: {
    DeleteFollow,
  },
  props: {
    // フォローまたはフォロワーの情報一覧
    followUserInformations: {
      type: Array,
      required: true,
    },
    // フォロー、フォロワーどちらのコンポーネントか判断する変数
    isFollow: {
      type: Boolean,
      required: true,
    },
    // 自分のフォローフォロワー一覧か否か
    isMyList: {
      type: Boolean,
      required: true,
    },
    // ログイン中のユーザーid
    myUserId: {
      type: Number,
      required: true,
    },
    // スケルトンスクリーン
    skeleton: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // 状態ごとの番号
      statusId: -1,
      // ログイン中ユーザーがフォローしている人のid一覧
      myFollowLists: [],
    }
  },
  async created() {
    // 子コンポーネントに渡すため自分のフォローしている人を配列に格納する
    const response = await this.$axios.$get(
      `https://api-instagram-app.herokuapp.com/mypage/${this.myUserId}`
    )
    this.myFollowLists = response.user.follow

    // 状態ごとに番号をつける
    if (this.isMyList === true && this.isFollow === true) {
      // このリストは自分のフォローリスト
      this.statusId = 1
    } else if (this.isMyList === true && this.isFollow === false) {
      // このリストは自分のフォロワーリスト
      this.statusId = 2
    } else if (this.isMyList === false && this.isFollow === true) {
      // このリストは他人のフォローリスト
      this.statusId = 3
    } else if (this.isMyList === false && this.isFollow === false) {
      // このリストは他人のフォロワーリスト
      this.statusId = 4
    }
  },
  methods: {
    /**
     * フォローを解除する.
     *
     * @params id - フォロー解除したいユーザーのid
     */
    async deleteFollow(id: number) {
      if (this.isMyList) {
        this.$emit('deleteFollowNumber')
      }
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          // eslint-disable-next-line object-shorthand
          userId: this.myUserId,
          targetUserId: id,
        }
      )
    },
    /**
     * フォロワーを解除する.
     *
     * @params id - フォロワー解除したいユーザーのid
     */
    async deleteFollower(id: number) {
      if (this.isMyList) {
        this.$emit('deleteFollowerNumber')
      }
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          // eslint-disable-next-line object-shorthand
          userId: id,
          targetUserId: this.myUserId,
        }
      )
    },
    /**
     * フォロー解除後再フォローする.
     *
     * @params id - 再フォローしたいユーザーのid
     */
    async addFollow(id: number) {
      if (this.isMyList) {
        this.$emit('addFollowNumber')
      }
      await this.$axios.post('https://api-instagram-app.herokuapp.com/follow', {
        // eslint-disable-next-line object-shorthand
        userId: this.myUserId,
        targetUserId: id,
      })
    },
    /**
     * リンク先が自分のプロフィールの場合とリンク先を分ける.
     *
     * @param targetId - リンク先のユーザーid
     */
    jumpUserPage(targetId: number) {
      if (this.myUserId === targetId) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/userPage/' + targetId)
      }
    },
  },
})
</script>

<style></style>
