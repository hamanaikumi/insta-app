<template>
  <div class="pt-2">
    <div
      v-for="followUserInformation of followUserInformations"
      :key="followUserInformation.userId"
      class="follow-user-list flex flex-row items-center p-2"
    >
      <nuxt-link
        :to="'/UserPage/' + followUserInformation.userId"
        class="follow-user-icon w-1/5"
      >
        <img :src="followUserInformation.icon" class="w-16 h-16 rounded-full" />
      </nuxt-link>
      <nuxt-link
        :to="'/UserPage/' + followUserInformation.userId"
        class="follow-user-name w-3/5"
      >
        {{ followUserInformation.userName }}
      </nuxt-link>

      <div class="delete-follow ml-auto">
        <DeleteFollow
          :is-follow="isFollow"
          @deleteFollow="deleteFollow(followUserInformation.userId)"
          @deleteFollower="deleteFollower(followUserInformation.userId)"
          @follow="addFollow(followUserInformation.userId)"
        ></DeleteFollow>
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
    followUserInformations: {
      type: Array,
      required: true,
    },
    // フォロー、フォロワーどちらのコンポーネントか判断する変数
    isFollow: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    /**
     * フォローを解除する.
     *
     * @params id - フォロー解除したいユーザーのid
     */
    async deleteFollow(id: number) {
      const userId = this.$store.getters['user/getLoginUserId']
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          // eslint-disable-next-line object-shorthand
          userId: userId,
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
      const userId = this.$store.getters['user/getLoginUserId']
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          // eslint-disable-next-line object-shorthand
          userId: id,
          targetUserId: userId,
        }
      )
    },
    /**
     * フォロー解除後再フォローする.
     *
     * @params id - 再フォローしたいユーザーのid
     */
    async addFollow(id: number) {
      const userId = this.$store.getters['user/getLoginUserId']
      await this.$axios.post('https://api-instagram-app.herokuapp.com/follow', {
        // eslint-disable-next-line object-shorthand
        userId: userId,
        targetUserId: id,
      })
    },
  },
})
</script>

<style></style>
