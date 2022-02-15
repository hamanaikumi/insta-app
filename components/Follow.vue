<template>
  <div>
    <div
      class="follow-user-list"
      v-for="followUserInformation of followUserInformations"
      :key="followUserInformation.userId"
    >
      <div class="follow-user-icon">
        <img :src="followUserInformation.icon" class="w-20 h-20 rounded-full" />
      </div>
      <div class="follow-user-name">
        {{ followUserInformation.userName }}
      </div>
      <div class="delete-follow">
        <DeleteFollow
          @delete="deleteFollow(followUserInformation.userId)"
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
    isFollow: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async deleteFollow(id: number) {
      const userId = this.$store.getters['user/getLoginUserId']
      const response = await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          // eslint-disable-next-line object-shorthand
          userId: userId,
          targetUserId: id,
        }
      )
      console.log('フォロー解除後の自分のユーザー情報')
      console.log(response)
    },
    async addFollow(id: number) {
      const userId = this.$store.getters['user/getLoginUserId']
      const response = await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/follow',
        {
          // eslint-disable-next-line object-shorthand
          userId: userId,
          targetUserId: id,
        }
      )
      console.log('フォロー後の自分のユーザー情報')
      console.log(response)
    },
  },
})
</script>

<style></style>
