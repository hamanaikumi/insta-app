<template>
  <div>
    <!-- ローディング中 -->
    <div v-if="loading" class="flex justify-center items-center h-[80vh]">
      <div
        class="animate-spin h-10 w-10 border-4 border-gray-400 rounded-full border-t-transparent"
      ></div>
    </div>
    <!-- 通知がなにもないとき -->
    <div
      v-if="notices.length === 0"
      class="flex flex-col justify-center w-full h-[75vh]"
    >
      <div class="text-center text-dark-gray text-xl">No notification</div>
    </div>
    <div v-for="notice of notices" :key="notice.noticeId">
      <!-- 通知を初めて見たとき -->
      <div v-if="notice.checked === false">
        <div class="flex mt-1 mb-1 relative">
          <nuxt-link :to="'/userPage/' + notice.contents.newUser.userId">
            <img
              :src="notice.contents.newUser.icon"
              class="w-16 h-16 rounded-full"
            />
          </nuxt-link>
          <!-- いいねのとき -->
          <div v-if="notice.type === 'favorite'" class="p-1 w-[80%]">
            <nuxt-link :to="'/postDetail/' + notice.contents.postId">
              <div class="w-full h-full font-body">
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
                liked your post
              </div>
            </nuxt-link>
          </div>
          <!-- 新しいコメントのとき -->
          <div v-if="notice.type === 'comment'" class="p-1 w-[80%]">
            <nuxt-link :to="'/postDetail/' + notice.contents.postId">
              <div class="w-full h-full font-body">
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
                commented on your post
              </div>
            </nuxt-link>
          </div>
          <!-- 新しいフォロワーのとき -->
          <div v-if="notice.type === 'follow'" class="p-1 w-[80%]">
            <nuxt-link :to="'/userPage/' + notice.contents.newUser.userId">
              <div class="w-full h-full font-body">
                You were followed by
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
              </div>
            </nuxt-link>
          </div>
          <!-- 日付 -->
          <div class="absolute right-3 bottom-0 text-xs text-gray-500">
            {{ notice.date }}
          </div>
        </div>
        <hr />
      </div>

      <!-- すでに見たことがある場合は薄くする -->
      <div v-if="notice.checked === true" class="opacity-60">
        <div class="flex mt-1 mb-1 relative">
          <nuxt-link :to="'/userPage/' + notice.contents.newUser.userId">
            <img
              :src="notice.contents.newUser.icon"
              class="w-16 h-16 rounded-full"
            />
          </nuxt-link>
          <!-- いいねのとき -->
          <div v-if="notice.type === 'favorite'" class="p-1 w-[80%]">
            <nuxt-link :to="'/postDetail/' + notice.contents.postId">
              <div class="w-full h-full font-body">
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
                liked your post
              </div>
            </nuxt-link>
          </div>
          <!-- 新しいコメントのとき -->
          <div v-if="notice.type === 'comment'" class="p-1 w-[80%]">
            <nuxt-link :to="'/postDetail/' + notice.contents.postId">
              <div class="w-full h-full font-body">
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
                commented on your post
              </div>
            </nuxt-link>
          </div>
          <!-- 新しいフォロワーのとき -->
          <div v-if="notice.type === 'follow'" class="p-1 w-[80%]">
            <nuxt-link :to="'/userPage/' + notice.contents.newUser.userId">
              <div class="w-full h-full font-body">
                You were followed by
                <strong>
                  {{ notice.contents.newUser.userName }}
                </strong>
              </div>
            </nuxt-link>
          </div>
          <!-- 日付 -->
          <div class="absolute right-3 bottom-0 text-xs text-gray-500">
            {{ notice.date }}
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
  middleware: 'auth',
  data() {
    return {
      notices: {} as any,
      loginUserId: Number,
      loading: true,
    }
  },

  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },

  created() {
    this.loginUserId = this.$store.getters['user/getLoginUserId']
    this.getLogs().then(() => {
      this.getdate()
    })
    this.chekedNotice()
  },

  methods: {
    /**
     * APIから通知の履歴をとってくる.
     */
    async getLogs() {
      const res = await this.$axios.get(
        `https://api-instagram-app.herokuapp.com/notice/${this.loginUserId}`
      )
      this.notices = res.data
      this.loading = false
    },
    /**
     * 日付を今からどれくらい前の表示にする
     */
    getdate() {
      for (const notice of this.notices) {
        // eslint-disable-next-line import/no-named-as-default-member
        // moment.locale('ja')
        const newDate = moment(new Date(notice.date)).fromNow()
        notice.date = newDate
      }
    },
    /**
     * 通知を確認したことをAPIに送る.
     */
    async chekedNotice() {
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/notice/checked',
        { userId: this.loginUserId }
      )
    },
  },
})
</script>

<style></style>
