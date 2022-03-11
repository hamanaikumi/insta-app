<template>
  <div :class="{ overlay: deleteModal }" class="p-4 bg-white">
    <!-- 各ページに合わせたユーザーネームの表示 -->
    <div
      v-if="
        $route.path.includes('/userPage') ||
        $route.path.includes('/followFollower')
      "
      class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 font-semibold"
      :v-on="getUserName()"
    >
      {{ displayUserName }}
    </div>
    <!-- ここまで -->
    <!-- Likes、Activity タイトル -->
    <div
      v-if="$route.path.includes('/likesList') || $route.path === '/activity'"
      class="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 font-semibold"
    >
      <h2 v-if="$route.path.includes('/likesList')">Likes</h2>
      <h2 v-if="$route.path === '/activity'">Activity</h2>
    </div>
    <div
      class="flex justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12"
    >
      <div>
        <nuxt-link
          v-if="$route.path === '/home' || $route.path === '/search'"
          to="/home"
        >
          <!-- 後で変更 -->
          <img src="../static/images/logo.png" class="h-10 w-auto" />
        </nuxt-link>
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/mypage' ||
            $route.path === '/setting'
          "
          to="/mypage"
          class="font-bold"
        >
          {{ userName }}
        </nuxt-link>

        <!-- 前のページに戻るボタン -->
        <button
          v-if="
            $route.path.includes('/likesList') ||
            $route.path.includes('/postDetail') ||
            $route.path === '/activity' ||
            $route.path.includes('/userPage') ||
            $route.path.includes('/followFollower')
          "
          class="mr-4"
          @click="$router.go(-1)"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>
      <div class="text-right flex items-center justify-between w-2/12">
        <!-- 投稿アイコン -->
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/mypage' ||
            $route.path.includes('/userPage') ||
            $route.path === '/home' ||
            $route.path === '/search' ||
            $route.path === '/activity' ||
            $route.path.toLowerCase().includes('/postdetail') ||
            $route.path.includes('/followFollower')
          "
          to="/addPost"
        >
          <i class="far fa-plus-square fa-lg fa-fw"></i>
        </nuxt-link>
        <!-- 通知アイコン -->
        <nuxt-link
          v-if="$route.path === '/home' || $route.path === '/search'"
          to="/activity"
          class="relative"
        >
          <!-- まだ通知を確認していないときの点滅アイコン -->
          <div v-if="giveNotice === false" class="absolute w-full h-full">
            <p
              class="animate-ping absolute right-0 top-[-4px] text-red-400 text-[1px]"
            >
              ●
            </p>
            <p class="absolute right-0 top-[-4px] text-red-400 text-[1px]">●</p>
          </div>
          <i class="far fa-heart fa-lg fa-fw"></i>
        </nuxt-link>
        <!-- 設定アイコン -->
        <nuxt-link
          v-if="
            $route.path === '/addPost' ||
            $route.path === '/mypage' ||
            $route.path.includes('/userPage') ||
            $route.path === '/activity' ||
            $route.path.includes('/followFollower') ||
            $route.path.toLowerCase().includes('/postDetail')
          "
          to="/setting"
        >
          <i class="fas fa-cog fa-lg fa-fw"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/* eslint no-unused-expressions: "off" */
export default Vue.extend({
  props: {
    giveNotice: { type: Boolean, required: true },
  },

  data() {
    return {
      displayUserName: '',
    }
  },

  computed: {
    /**
     * ログインしているユーザー名を取得する
     */
    userName(): string {
      return this.$store.getters['user/getLoginUserName']
    },

    /**
     * 親から最新の通知を受け取ってそれが確認済みの場合はtrue,していない場合はfalseを渡す.
     */
    notices(): Boolean {
      if (this.giveNotice === false) {
        return false
      } else {
        return true
      }
    },
    deleteModal(): boolean {
      return this.$store.getters['modal/getDeleteModalStatus']
    },
  },
  created() {
    // ヘッダーフッターからoverlayを外す
    this.$store.commit('modal/modalOff')
  },
  methods: {
    async getUserName() {
      const userId = this.$route.params.id
      const response = await this.$axios.$get(
        `https://api-instagram-app.herokuapp.com/mypage/${userId}`
      )
      this.displayUserName = response.user.userName
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  animation: fade 0.3s ease-out forwards;
}
@keyframes fade {
  0% {
    background: white;
  }
  50% {
    background: #e6e6e6;
  }
  100% {
    background: #cccccc;
  }
}
</style>
