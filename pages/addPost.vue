<template>
  <div class="container mx-auto mt-10">
    <!-- <div class="mx-auto m-32"></div> -->
    <!-- image -->
    <div class="flex justify-center grid grid-cols-6 gap-1 mb-4 mx-2">
      <div
        class="flex justify-center pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        <div class="space-y-1 text-center">
          <svg
            v-if="isBeforeSelect"
            class="mx-auto h-12 w-24 text-gray-400"
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
          <div
            v-if="isBeforeSelect"
            class="flex justify-center text-sm text-gray-600"
          >
            <label
              for="file-upload"
              class="cursor-pointer rounded-md font-medium"
            >
              <span class="text-lg">
                Select Image
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="fileSelected"
              /></span>
            </label>
          </div>
          <div v-if="!isBeforeSelect">
            <!-- :img-styleで読み込んだ画像の大きさを指定
           :aspect-ratioで比率を指定 -->
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
              :min-container-width="120"
              :min-container-height="120"
              :img-style="{ width: '120px', height: '120px' }"
              :aspect-ratio="1"
            >
            </vue-cropper>
            <button type="button" @click="cropImage">トリミングする</button>
          </div>
        </div>
      </div>
      <!-- トリミング後の画像 -->
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        <div>
          <button type="button" @click="prev">prev</button>
          <div v-for="(image, i) of cropImageCodes" :key="i">
            <img
              v-if="index === i"
              :src="image"
              alt="Cropped Image"
              width="200"
              height="200"
            />
          </div>
          <br />
          <button type="button" @click="next">next</button>
        </div>
      </div>
    </div>
    <!-- prefecture -->
    <div class="flex grid grid-cols-6 gap-1 mb-4 mx-2">
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        <div class="space-y-1 text-center">
          <svg
            class="mx-auto h-12 w-24 text-gray-400"
            aria-hidden="true"
            data-icon="location-dot"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 600"
          >
            <path
              d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"
            ></path>
          </svg>
          <div class="flex justify-center text-sm text-gray-600">
            <label
              for="file-upload"
              class="cursor-pointer rounded-md font-medium"
            >
              <span class="text-lg">
                Add Prefecture
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
              /></span>
            </label>
          </div>
        </div>
      </div>
      <!-- 選択したprefecture -->
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        Prefecture
      </div>
    </div>
    <!-- caption -->
    <div class="mx-2">
      <textarea
        rows="3"
        class="block w-full sm:text-sm border border-gray-300 p-2"
        placeholder="Write a caption..."
      />
    </div>
    <!-- button -->
    <div class="px-4 py-3 text-center mt-4">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl"
      >
        Share
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {},
  data() {
    return {
      // 画像が選択されたかの判定（選択窓の表示切替）
      isBeforeSelect: true,
      // 添付画像のソース
      selectedImage: '',
      // トリミング後の画像のソース(変換前)
      cropImageCode: '',
      // トリミング後の画像のソース(変換後)
      cropImageFile: {},
      // cropImageFileを入れた配列
      imageUrlArray: Array,
      // トリミング後の画像のソース(変換前)を格納する配列
      // eslint-disable-next-line no-array-constructor
      cropImageCodes: Array<any>(),
      // 表示している画像のインデックス
      index: 0,
    }
  },
  methods: {
    /**
     * 画像を選択し、添付する.
     *
     * @param - 添付ファイル
     */
    fileSelected(e: any): void {
      const file = e.target.files[0]
      // console.log(file)

      if (!file.type.includes('image/')) {
        alert('画像ファイルを選択してください')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          this.selectedImage = event.target.result
          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result)
          }
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
      // 表示切り替え
      this.isBeforeSelect = false
    },

    /**
     * 画像をトリミングする.
     */
    cropImage(): void {
      if (this.$refs.cropper) {
        const fileData = this.$refs.cropper.getCroppedCanvas().toDataURL()
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
        this.cropImageFile = imageFile
        // 初期化
        this.selectedImage = ''
        // トリミング後のコードを配列に格納
        this.cropImageCodes.push(this.cropImageCode)
      }
      // 表示切り替え
      this.isBeforeSelect = true
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
  },
})
</script>

<style scoped>
.location-dot {
  color: gray;
}
</style>
