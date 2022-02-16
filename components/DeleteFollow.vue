<template>
  <div>
    <button
      v-if="displayButton"
      class="text-xs bg-transparent text-black font-semibold py-1 px-2 border border-gray-300 rounded"
      type="button"
      @click="onClickDelete()"
    >
      {{ button }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isFollow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      button: '削除',
      displayButton: true,
    }
  },
  methods: {
    onClickDelete() {
      if (this.isFollow === true) {
        if (this.button === '削除') {
          this.$emit('deleteFollow')
          this.button = 'フォロー'
        } else if (this.button === 'フォロー') {
          this.$emit('follow')
          this.button = '削除'
        }
      } else {
        this.$emit('deleteFollower')
        this.displayButton = false
      }
    },
  },
})
</script>

<style></style>
