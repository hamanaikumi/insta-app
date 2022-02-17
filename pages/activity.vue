<template>
  <div>
    <div v-for="log of logs" :key="log.logId">
      <div class="flex mt-1 mb-1 relative">
        <img :src="log.contents.newUser.icon" class="w-16 h-16 rounded-full" />
        <!-- いいねのとき -->
        <div v-if="log.type === 'favorite'" class="">
          <div class="">
            <p class="font-bold inline-block">
              {{ log.contents.newUser.userName }}
            </p>
            さんがあなたの投稿にいいねしました！
          </div>
        </div>
        <!-- 新しいコメントのとき -->
        <div v-if="log.type === 'comment'">
          <div class="">
            <p class="font-bold inline-block">
              {{ log.contents.newUser.userName }}
            </p>
            さんがあなたの投稿にコメントしました！
          </div>
        </div>
        <!-- 新しいフォロワーのとき -->
        <div v-if="log.type === 'follow'">
          <div class="">
            <p class="font-bold inline-block">
              {{ log.contents.newUser.userName }}
            </p>
            さんがあなたをフォローしました！
          </div>
        </div>
        <!-- 日付 -->
        <div class="absolute right-3 bottom-0 text-xs text-gray-500">
          {{ log.date }}
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
  data() {
    return {
      logs: []as any,
      loginUserId: Number,
    }
  },

  created() {
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getLogs().then(() => {
      this.getdate()
    })
  },
  methods: {
    /**
     * APIから通知の履歴をとってくる.
     */
    async getLogs() {
      const res = await this.$axios.get(
        `https://api-instagram-app.herokuapp.com/notice/${this.loginUserId}`
      )
      this.logs = res.data
    },
    /**
     * 日付を今からどれくらい前の表示にする
     */
    getdate() {
      for (const log of this.logs) {
        // eslint-disable-next-line import/no-named-as-default-member
        moment.locale('ja')
        const newDate = moment(new Date(log.date)).fromNow()
        log.date = newDate
      }
    },
  },
})
</script>

<style></style>
