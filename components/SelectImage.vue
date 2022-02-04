<template>
  <div>
    <button type="button" @click="prev">prev</button>
    <div v-for="cropImage of cropImageCodes" :key="cropImage">
      <img :src="cropImage" alt="Cropped Image" width="200" height="200" />
    </div>
    <br />
    <button type="button" @click="next">next</button>
    <button type="button" @click="submit">送信</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

import 'cropperjs/dist/cropper.css'

export default Vue.extend({
  props: ['cropImageCode'],
  data() {
    return {
      // eslint-disable-next-line no-array-constructor
      cropImageCodes: Array<any>(),
      // cropImageFileを入れた配列
      imageUrlArray: Array,
      // 表示している画像のインデックス
      index: 0,
    }
  },
  mounted() {
    console.log(this.cropImageCode)
    this.cropImageCodes.push(this.cropImageCode)
  },
  methods: {
    next() {
      this.index += 1
    },
    prev() {
      this.index -= 1
    },
    // 画像を送信する.
    async submit(): Promise<void> {
      // get secure url from our server
      const { url } = await fetch('http://localhost:8080/s3Url').then((res) =>
        res.json()
      )
      console.log(url)

      // post the image direclty to the s3 bucket
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: this.cropImg,
      })

      const imageUrl: string = url.split('?')[0]
      console.log(imageUrl)
      await this.files.push(imageUrl)
      // sqlにpost する
      const res: any = await axios.post('http://localhost:8080/', {
        url: imageUrl,
      })
      // console.log(res);
    },
  },
})
</script>
<style></style>
