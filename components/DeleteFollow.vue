<template>
  <div>
    <button type="button" @click="onClickDelete()">{{ button }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      button: '削除',
    }
  },
  methods: {
    onClickDelete() {
      if (this.button === '削除') {
        this.$emit('delete')
        this.button = 'フォロー'
      } else if (this.button === 'フォロー') {
        this.$emit('follow')
        this.button = '削除'
      }
    },
  },
})
</script>

<style></style>
