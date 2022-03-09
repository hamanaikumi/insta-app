<template>
  <div
    :class="{ overlay: deleteModal }"
    class="pt-7 pb-7 text-center flex bg-white"
  >
    <!-- 検索アイコン -->
    <nuxt-link to="/search" class="w-[33.33%]">
      <i class="fas fa-search fa-lg"></i>
    </nuxt-link>
    <!-- homeアイコン -->
    <nuxt-link to="/home" class="w-[33.33%]">
      <i class="fas fa-home fa-lg"></i>
    </nuxt-link>
    <!-- マイページアイコン -->
    <nuxt-link to="/mypage" class="w-[33.33%]">
      <i class="fas fa-user-circle fa-lg"></i>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    deleteModal(): Boolean {
      return this.$store.getters['modal/getDeleteModalStatus']
    },
  },
  created() {
    // ヘッダーフッターからoverlayを外す
    this.$store.commit('modal/modalOff')
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
