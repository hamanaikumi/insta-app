<template>
  <body class="">
    <main>
      <header-componet
        v-if="$route.path !== '/' && $route.path !== '/Signup'"
        class="fixed top-0 w-full z-10 max-w-[428px]"
        :give-notice="notice"
      />
      <Nuxt class="pt-[56px] z-0 mb-10" />
      <footer-componet
        v-if="$route.path !== '/' && $route.path !== '/Signup'"
        class="fixed bottom-0 w-full z-10 max-w-[428px]"
      />
    </main>
  </body>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      notice: false,
    }
  },
  updated() {
    this.getNotice()
  },
  created(){
    this.getNotice()
  },
  methods: {
    /**
     * 通知を受け取って、一番最新の通知をすでに確認済みかどうかをヘッダーに渡す.
     */
    async getNotice() {
      const userId = this.$store.getters['user/getLoginUserId']
      if (this.$route.path === '/Home' || this.$route.path === '/Search') {
        const res = await this.$axios.get(
          `https://api-instagram-app.herokuapp.com/notice/${userId}`
        )
        this.notice = res.data[0].checked
      }
    },
  },
})
</script>

<style scoped>
body {
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
}
</style>
