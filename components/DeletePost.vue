<template>
  <div class="overflow-visible relative mx-auto w-4 h-8">
    <!-- pulldown -->
    <button class="" @click="showMenu">
      <i class="fas fa-ellipsis-h"></i>
    </button>
    <transition name="fade">
      <div
        v-if="menuFlag"
        class="absolute top-100 right-0 border border-light-gray rounded text-sm bg-white"
      >
        <div class="flex justify-center px-3 py-2">
          <button @click="showModal">Delete</button>
        </div>
      </div>
    </transition>

    <!-- modal -->
    <div v-if="modalFlag">
      <transition name="modal" appear>
        <div class="modal__overlay">
          <div class="modal__window">
            <div class="modal__content">
              <div class="flex flex-col justify-center">
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
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    // 親コンポーネント(PostDetail.vue）から受けたpostID
    postId: { type: Number, required: true },
    // 親コンポーネント(PostDetail.vue）から受けたpostImageUrl
    postImageUrl: { type: Array, required: true },
  },
  data() {
    return {
      // 削除のプルダウン表示判定用
      menuFlag: false,
      //  モーダル表示判定用
      modalFlag: false,
    }
  },
  methods: {
    /**
     * 削除のブルダウンの表示切り替えをする.
     */
    showMenu() {
      if (this.menuFlag) {
        this.menuFlag = false
      } else {
        this.menuFlag = true
      }
    },
    /**
     * モーダルウィンドウを表示する.
     */
    showModal() {
      this.modalFlag = true
      this.menuFlag = false
      // ヘッダーフッターにoverlay適用
      this.$store.commit('modal/modalOn')
    },
    /**
     * モーダルウィンドウを閉じる.
     */
    hideModal() {
      this.modalFlag = false
      // ヘッダーフッターからoverlayを外す
      this.$store.commit('modal/modalOff')
    },
    /**
     * 投稿を削除する.
     */
    async deletePost() {
      const res: any = await this.$axios.delete(
        'https://api-instagram-app.herokuapp.com/post',
        {
          data: { postId: this.postId },
        }
      )
      // S3のバケットから写真を削除
      const s3res: any = await this.$axios.delete(
        'https://api-instagram-app.herokuapp.com/s3Url',
        {
          data: { urlArray: this.postImageUrl },
        }
      )

      // 削除成功時
      if (res.data.status === 'success' && s3res.data.status === 'success') {
        this.hideModal()
        // 投稿詳細画面にいた場合、マイページに遷移
        if (this.$route.path === `/postDetail/${this.postId}`) {
          this.$router.push('/mypage')
        } else {
          //  親コンポーネント(PostDetail.vue)のイベントを発火し、ホーム画面を更新する
          this.$emit('update')
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
// プルダウンのトランジションが始まる/終わるフェーズ中
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
// 開始/終了状態
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 削除モーダル
.modal {
  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  &__window {
    height: 20%;
    width: 70%;
    overflow: visible;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}
// 削除モーダルのトランジションが始まる/終わるフェーズ中
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
  .modal__window {
    transition: opacity 0.4s, transform 0.4s;
  }
}
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}
// 開始/終了状態
.modal-enter,
.modal-leave-to {
  opacity: 0;
  .modal__window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
