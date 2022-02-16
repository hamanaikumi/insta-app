<template>
  <div class="pt-2">
    <div
      v-for="followUserInformation of followUserInformations"
      :key="followUserInformation.userId"
      class="follow-user-list flex flex-row items-center p-2"
    >
      <!-- <div class="follow-user-icon w-1/5"> -->
      <nuxt-link
        :to="'/UserPage/' + followUserInformation.userId"
        class="follow-user-icon w-1/5"
      >
        <img :src="followUserInformation.icon" class="w-16 h-16 rounded-full" />
      </nuxt-link>
      <!-- </div> -->

      <!-- <div class="follow-user-name w-3/5"> -->
      <nuxt-link
        :to="'/UserPage/' + followUserInformation.userId"
        class="follow-user-name w-3/5"
      >
        {{ followUserInformation.userName }}
      </nuxt-link>
      <!-- </div> -->

      <div class="delete-follow ml-auto">
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
