<template>
  <div class="container mx-auto">
    <div class="flex justify-center grid grid-cols-6 gap-1 mb-4 mx-2">
      <!-- image -->
      <div
        class="flex justify-center pt-5 pb-6 border border-light-gray col-span-3 h-60"
      >
        <div class="space-y-1 text-center mt-12">
          <svg
            v-if="isBeforeSelect"
            class="mx-auto mt-4 h-12 w-24 text-light-gray"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div v-if="isBeforeSelect" class="mx-auto text-light-gray">
            <label for="file-upload" class="cursor-pointer rounded-md">
              <span class="text-lg">
                Select Image
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  accept="image/jpeg, image/jpg, image/png"
                  @change="fileSelected"
              /></span>
            </label>
            <div class="pt-4 px-6 text-sm text-warning-color">
              {{ errorImage }}
            </div>
          </div>
          <!-- modal -->
          <client-only>
            <modal
              name="image-modal"
              :click-to-close="false"
              width="300px"
              height="auto"
            >
              <div class="modal-body my-4 flex flex-col">
                <vue-cropper
                  ref="cropper"
                  :guides="true"
                  :view-mode="1"
                  drag-mode="crop"
                  :auto-crop-area="1"
                  :background="true"
                  :rotatable="false"
                  :src="selectedImage"
                  alt="Source Image"
                  :min-container-width="30"
                  :min-container-height="30"
                  :img-style="{ width: '100%', height: '100%' }"
                  :aspect-ratio="1"
                >
                </vue-cropper>
                <div class="mt-4">
                  <button
                    class="inline-flex justify-center py-2 px-4 text-xl text-dark-gray font-semibold"
                    type="button"
                    @click="hideImageModal"
                  >
                    Cancel
                  </button>
                  <button
                    class="inline-flex justify-center py-2 px-4 text-xl text-accent-color font-semibold"
                    type="button"
                    @click="cropImage"
                  >
                    Add
                  </button>
                </div>
              </div>
            </modal>
          </client-only>
        </div>
      </div>
      <!-- トリミング後の画像 -->
      <div class="px-2 py-2 border border-light-gray col-span-3">
        <div v-for="(image, i) of cropImageCodes" :key="i" class="crop-image">
          <img
            v-show="index === i"
            :src="image"
            alt="Cropped Image"
            class="object-center"
          />
          <button
            v-show="index === i"
            class="rounded-full px-2"
            @click="deleteImage(i)"
          >
            &times;
          </button>
        </div>
        <div class="mt-2 flex justify-between">
          <div>
            <button
              v-show="cropImageCodes.length > 1 && index > 0"
              type="button"
              class="bg-light-gray hover:bg-dark-gray rounded-full px-2"
              @click="prev"
            >
              <i class="fa fa-chevron-left"></i>
            </button>
          </div>
          <div>
            <button
              v-if="
                cropImageCodes.length > 1 && index < cropImageCodes.length - 1
              "
              type="button"
              class="bg-light-gray hover:bg-dark-gray rounded-full px-2"
              @click="next"
            >
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- prefecture -->
    <div class="flex grid grid-cols-6 gap-1 mb-4 mx-2">
      <div
        class="flex justify-center px-6 pt-5 pb-6 border border-light-gray col-span-3"
      >
        <div class="space-y-1 text-center location-dot">
          <svg
            class="mx-auto h-12 w-24 text-light-gray"
            aria-hidden="true"
            data-icon="location-dot"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 600"
          >
            <path
              d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"
            ></path>
          </svg>
          <div class="mx-auto text-light-gray">
            <label
              for="file-upload"
              class="cursor-pointer rounded-md font-medium"
            >
              <div class="text-lg">
                <button type="button" @click="showPrefectureModal">
                  Add Prefecture
                </button>
              </div>
            </label>
          </div>
          <!-- modal -->
          <client-only>
            <modal
              name="prefecture-modal"
              :click-to-close="false"
              width="300px"
              height="auto"
            >
              <div class="modal-body my-4 flex flex-col">
                <SelectPrefecture @givePrefecture="catchPrefecture" />
                <div class="mt-4">
                  <button
                    class="inline-flex justify-center py-2 px-4 text-xl text-dark-gray font-semibold"
                    type="button"
                    @click="hidePrefectureModal"
                  >
                    Cancel
                  </button>
                  <button
                    class="inline-flex justify-center py-2 px-4 text-xl text-accent-color font-semibold"
                    type="button"
                    @click="addPrefecture"
                  >
                    Add
                  </button>
                </div>
              </div>
            </modal>
          </client-only>
        </div>
      </div>
      <!-- 選択したprefecture -->
      <div
        class="grid content-center px-6 pt-5 pb-6 border border-light-gray col-span-3"
      >
        <div class="text-center text-input-value-color text-lg">
          {{ showPrefecture }}
        </div>
      </div>
    </div>
    <!-- caption -->
    <div class="mx-2">
      <textarea
        v-model="caption"
        rows="5"
        class="block w-full border border-light-gray p-2 focus:outline-none"
        placeholder="Write a caption..."
        maxlength="200"
      />

      <p class="text-right text-input-value-color">{{ caption.length }}/200</p>
    </div>
    <!-- button -->
    <div class="px-4 py-3 text-center mt-2">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl text-dark-gray font-semibold"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="inline-flex justify-center py-2 px-4 text-xl text-accent-color font-semibold"
        type="button"
        @click="submit"
      >
        Share
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import imageCompression from 'browser-image-compression'
import SelectPrefecture from '~/components/SelectPrefecture.vue'
export default Vue.extend({
  components: { SelectPrefecture },
  middleware: 'auth',
  data() {
    return {
      // 画像が選択されたかの判定（選択窓の表示切替）
      isBeforeSelect: true,
      // 添付画像のソース
      selectedImage: '',
      // トリミング後の画像のソース(変換前)
      cropImageCode: '',
      // トリミング後の画像のソース(変換後)
      // eslint-disable-next-line no-array-constructor
      cropImageFiles: Array<any>(),
      // トリミング後の画像のソース(変換前)を格納する配列
      // eslint-disable-next-line no-array-constructor
      cropImageCodes: Array<any>(),
      // cropImageFileを入れた配列(APIにPOST)
      // eslint-disable-next-line no-array-constructor
      imageUrlArray: Array<any>(),
      // 表示している画像のインデックス
      index: 0,
      // 選択した都道府県オブジェクト（子コンポーネントからの値を格納）
      selectedPrefecture: { id: '', name: '' },
      // 都道府県名(APIにPOST)
      showPrefecture: '',
      // キャプション(APIにPOST)
      caption: '',
      // 添付画像エラー文
      errorImage: '',
    }
  },

  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },

  methods: {
    /**
     * 画像を選択し、添付する.
     * @param e - 添付ファイル
     */
    fileSelected(e: any): void {
      // ファイル数が5枚以上の場合のエラー
      if (this.cropImageFiles.length > 4) {
        this.errorImage = '画像枚数は5枚以下にしてください'
        return
      }
      const file = e.target.files[0]
      if (file) {
        // 制限サイズ(5MB)
        const sizeLimit = 1024 * 1024 * 5
        // ファイルサイズが制限以上の場合のエラー
        if (file.size > sizeLimit) {
          this.errorImage = 'ファイルサイズは5MB以下にしてください'
          return
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader()
          reader.onload = (event: any) => {
            this.selectedImage = event.target.result
            // rebuild cropperjs with the updated source
            if (this.$refs.cropper) {
              ;(this as any).$refs.cropper.replace(event.target.result)
            }
          }
          reader.readAsDataURL(file)
        } else {
          this.errorImage = 'Sorry, FileReader API not supported'
        }
        // 表示切り替え
        this.isBeforeSelect = false
        this.showImageModal()
        this.errorImage = ''
      }
    },

    /**
     * 画像をトリミングする.
     */
    async cropImage(): Promise<void> {
      if (this.$refs.cropper) {
        const fileData = (this as any).$refs.cropper
          .getCroppedCanvas()
          .toDataURL()
        // Base64データ
        this.cropImageCode = fileData
        // base64をデコード
        const bin = atob(fileData.replace(/^.*,/, ''))
        // バイナリデータに変換する
        const buffer = new Uint8Array(bin.length)
        for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i)
        }
        // Fileオブジェクトを生成
        const fileName = 'newFile'
        const fileType = 'image/jpeg'
        const imageFile = new File([buffer.buffer], fileName, {
          type: fileType,
        })
        // Fileオブジェクトを圧縮
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        }
        const compFile = await imageCompression(imageFile, options)

        this.cropImageFiles.push(compFile)
        // 初期化
        this.selectedImage = ''
        // トリミング後のコードを配列に格納
        this.cropImageCodes.push(this.cropImageCode)
      }
      // 表示切り替え
      this.isBeforeSelect = true
      this.hideImageModal()
    },
    /**
     * 次の画像を表示する.
     */
    next() {
      this.index += 1
    },
    /**
     * 前の画像を表示する.
     */
    prev() {
      this.index -= 1
    },
    /**
     * 画像追加のモーダルウィンドウを表示する.
     */
    showImageModal() {
      ;(this as any).$modal.show('image-modal')
    },

    /**
     * 画像追加のモーダルウィンドウを閉じる.
     */
    hideImageModal() {
      ;(this as any).$modal.hide('image-modal')
      // 表示切り替え
      this.isBeforeSelect = true
    },

    /**
     * 都道府県追加のモーダルウィンドウを表示する.
     */
    showPrefectureModal() {
      ;(this as any).$modal.show('prefecture-modal')
      // 初期化
      this.selectedPrefecture = { id: '', name: '' }
      this.showPrefecture = ''
    },

    /**
     * 都道府県追加のモーダルウィンドウを閉じる.
     */
    hidePrefectureModal() {
      ;(this as any).$modal.hide('prefecture-modal')
      // 表示切り替え
      this.isBeforeSelect = true
    },

    /**
     * 子コンポーネントから選択された都道府県を受け取る.
     * @param prefecture - 都道府県
     */
    catchPrefecture(prefecture: any) {
      this.selectedPrefecture = prefecture
    },

    /**
     * 都道府県を画面表示する.
     */
    addPrefecture() {
      this.showPrefecture = this.selectedPrefecture.name
      this.hidePrefectureModal()
    },

    /**
     * ユーザーID、画像、都道府県、キャプションを送信する.
     */
    async submit(): Promise<void> {
      // 画像が添付されていない場合エラー文を表示
      if (this.cropImageCodes.length < 1) {
        this.errorImage = '画像ファイルを選択してください'
        return
      }
      // ローディング開始
      this.$nuxt.$loading.start()
      const urlArray = []
      // S3からURLを取得
      for (let i = 0; i < this.cropImageCodes.length; i++) {
        const { url } = await fetch(
          'https://api-instagram-app.herokuapp.com/s3Url'
        ).then((res) => res.json())
        urlArray.push(url)
      }
      // S3のバケットに写真をPOST
      this.imageUrlArray = []
      let imageUrl = ''
      for (let i = 0; i < urlArray.length; i++) {
        await fetch(urlArray[i], {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: this.cropImageFiles[i] as any,
        })
        imageUrl = urlArray[i].split('?')[0]
        await this.imageUrlArray.push(imageUrl)
      }
      // ログインしているユーザーIDを取得.
      const userId = await this.$store.getters['user/getLoginUserId']
      // APIに投稿情報をPOST
      await this.$axios.post('https://api-instagram-app.herokuapp.com/post', {
        userId,
        imageUrl: this.imageUrlArray,
        caption: this.caption,
        prefecture: this.selectedPrefecture,
        postDate: new Date(),
      })
      // ローディング終了
      this.$nuxt.$loading.finish()
      // ホーム画面に遷移
      this.$router.push('/home')
    },

    /**
     * 投稿をキャンセルしてホーム画面に遷移する.
     */
    cancel() {
      this.$router.push('/home')
    },
    /**
     * 選択した写真を削除する.
     */
    deleteImage(i: number) {
      this.cropImageFiles.splice(i, 1)
      this.cropImageCodes.splice(i, 1)
      if (i !== 0) {
        this.prev()
      }
    },
  },
})
</script>

<style scoped>
.location-dot {
  fill: #b3b3b3;
}

.modal-body {
  padding: 5px 25px;
}

::placeholder {
  color: #8a8a8a;
}
.fa {
  color: white;
}
.crop-image {
  position: relative;
}
.crop-image > button {
  position: absolute;
  top: 1%;
  right: 5%;
  margin: 0;
  padding: 0;
  color: white;
}
</style>
