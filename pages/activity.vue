<template>
  <div>
    <div></div>
    <div v-for="log of logs" :key="log.logId">
      <img :src="log.contents.newUser.icon" class="w-20 h-20 rounded-full" />
      <div v-if="log.type === 'favorite'">いいね</div>
      <div v-if="log.type === 'comment'">コメント</div>
      <div v-if="log.type === 'follow'">フォロー</div>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      logs: {},
      loginUserId: Number,
    }
  },

  created() {
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getLogs()
  },
  methods: {
    async getLogs() {
      const res = await this.$axios.get(
        `https://api-instagram-app.herokuapp.com/notice/${this.loginUserId}`
      )
      this.logs = res.data
    },
  },
})
</script>

<style></style>
