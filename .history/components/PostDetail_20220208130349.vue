<template>
  <div class="post-container">
    <div class="top-container flex flex-row">
      <div class="icon-container">
        <img
          src="https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2"
          alt=""
        />
      </div>
      <div class="top-item-container">
        <div class="user-name">_XXXXX</div>
        <div class="prefecture-name">Tokyo</div>
      </div>
    </div>
    <div class="img-container">
      <img
        src="https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2"
        alt=""
      />
    </div>
    <div class="activity-container">
      <div class="flex flex-row">
        <button type="button" @click="clickLiked()">
          <i class="far fa-heart"></i>
        </button>
        <button class="ml-2"><i class="far fa-comment"></i></button>
      </div>
      <div class="liked-container">
        <span> Liked by 20 !</span>
      </div>
    </div>
    <div class="caption-container">
      <div class="user-name">@_XXXXX</div>
      <div class="caption-container">{{ currentPosDetail.caption }}</div>
      <div>January 1,2022</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
// no-this-in-fetch-data

export default Vue.extend({
  props: {
    // 親コンポーネント（モーダル or HomePage）から受けたpostID
    givePostId: Number,
  },
  data() {
    return {
      // 現在取得ている投稿
      currentPosDetail: Object,
    }
  },

  created() {
    // poatIDに基づいた投稿詳細内容を取得するメソッド
    this.getPostDetail()
  },
  methods: {
    /**
     *  親から渡されたpostIDに基づいて、投稿詳細内容をAPIから取得する.
     */
    async getPostDetail() {
      const response = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.givePostId}`
      )
      this.currentPosDetail = response.data
      console.dir(
        'this.currentPostDetail' + JSON.stringify(this.currentPosDetail)
      )
    },
    // いいね
    // clickLiked() {
    //   console.dir(
    //     'いいねメソッド loginUserName :' +
    //       JSON.stringify(this.$store.getters['user/getLoginUserName'])
    //   )
    // },

    /**
     * いいねする.
     */
    async clickLiked() {
      console.log('いいねメソッド発動!')

      const response = await axios.post(
        'https://api-instagram-app.herokuapp.com/favorite',
        {
          userName: this.$store.getters['user/getLoginUserInfo.userName'],
          postId: this.givePostId,
        }
      )
      console.dir('いいねresponse:' + JSON.stringify(response))
    },
  },
})
</script>

<style scoped>
.post-container {
  width: 100%;
  padding: 0.63rem;
}

.top-container {
  max-width: 100%;

  align-items: center;
  box-sizing: border-box;
}

.icon-container {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.icon-container img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.top-item-container {
  margin-left: 1rem;
}
.user-name {
  font-size: 0.87rem;
  font-weight: 500;
  line-height: 1;
}
.prefecture-name {
  font-size: 0.75rem;
  font-weight: 300;
}

.img-container {
  width: 100%;
  max-height: 17.5rem;
  text-align: center;
}
.img-container img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.caption-container {
  max-width: 100%;
  width: 100%;
  font-weight: 300;
}

/* .activity-container {
} */
</style>
