<template>
  <div class="mx-auto">
    <!-- navbar -->
    <div class="flex justify-end">
      <button @click="showMenu"><i class="fas fa-ellipsis-h"></i></button>
    </div>
    <div v-if="menuFlag" class="flex justify-end">
      <div
        class="flex justify-center w-16 h-8 border border-light-gray rounded text-sm"
      >
        <button @click="showModal">Delete</button>
      </div>
    </div>
    <!-- modal -->
    <client-only>
      <modal
        name="delete-modal"
        :click-to-close="false"
        width="300px"
        height="auto"
      >
        <div name="modal-body" class="p-4">
          <div class="text-center text-sm">
            <p>投稿を削除しますか？</p>
            <p>削除後の投稿は復元できません</p>
          </div>
          <div class="flex justify-center mt-4">
            <button
              class="inline-flex justify-center px-4 text-xl text-dark-gray"
              type="button"
              @click="hideModal"
            >
              Cancel
            </button>
            <button
              class="inline-flex justify-center px-4 text-xl text-warning-color"
              type="button"
              @click="deletePost"
            >
              Delete
            </button>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    // 親コンポーネント(Home.vue）から受けたpostID
    postId: { type: Number, required: true },
  },
  data() {
    return {
      menuFlag: false,
    }
  },
  methods: {
    showMenu() {
      if (this.menuFlag) {
        this.menuFlag = false
      } else {
        this.menuFlag = true
      }
    },
    /**
     * 投稿削除のモーダルウィンドウを表示する.
     */
    showModal() {
      ;(this as any).$modal.show('delete-modal')
      this.menuFlag = false
    },
    /**
     * 投稿削除のモーダルウィンドウを閉じる.
     */
    hideModal() {
      ;(this as any).$modal.hide('delete-modal')
    },
    /**
     * 投稿を削除する.
     */
    deletePost() {
      const res = this.$axios.post(
        'https://api-instagram-app.herokuapp.com/post',
        this.postId
      )
      console.log(res)
    },
  },
})
</script>
delete：postId
返り値：{status:”success”,data:送られてきたpostId,message:”削除完了”}
URL：https://api-instagram-app.herokuapp.com/post
<style>
.modal-body {
  padding: 5px 25px;
}
</style>
