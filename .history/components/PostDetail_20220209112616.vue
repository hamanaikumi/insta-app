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
        <div class="user-name">{{ currentPostUserInfo.userName }}</div>
        <div class="prefecture-name">
          {{ currentPostDetail.prefectureName[0] }}
        </div>
      </div>
    </div>
    <div class="img-container">
      <img :src="currentPostDetail.imageUrl" alt="" />
    </div>
    <div class="activity-container">
      <div class="flex flex-row">
        <!-- いいねボタン -->
        <button type="button" @click="clickLiked()">
          <i class="far fa-heart"></i>
        </button>
        <!-- コメントボタン -->
        <button class="ml-2"><i class="far fa-comment"></i></button>
      </div>
      <div class="liked-container">
        <span>
          Liked by
          {{ currentPostDetail.likes }}!</span
        >
      </div>
    </div>
    <div class="caption-container">
      <div class="user-name">{{ currentPostUserInfo.userName }}</div>
      <div class="caption-container">{{ currentPostDetail.caption }}</div>
      <div>{{ currentPostDetail.postData }}</div>
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
      // 現在取得している投稿
      currentPostDetail: {
        caption: String,
        prefectureName: [],
        postData: '',
        imageUrl: [],
        likes: [],
      },
      // 現在取得している投稿のユーザー情報
      currentPostUserInfo: Object,
      // 現在の投稿のいいね数
      currentLikes: [],

      // 投稿日時 ENGLISH
      postDateByEnglish: '',
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
      // responseの投稿内容
      const responsePostDetail = response.data

      // 投稿日時format化
      const MONTH_EN_LIST = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      // 投稿日時をnew DATE()
      const DATE = new Date(responsePostDetail.postData)
      // dateから月を取り出してmonthに代入
      const month: number = DATE.getMonth()
      // MONTH_EN_LISTのmonth番目の要素を代入。<getMonth()は0-11までの整数が返るので、[month-1]とする必要はない >
      const MONTH_EN = MONTH_EN_LIST[month]
      // 一番最後の式を見やすくするため、dateから日を取り出してdayに代入
      const DAY = DATE.getDate()

      const YEAR = DATE.getFullYear()
      // 同様にdateから年を取り出してyearに代入

      this.postDateByEnglish = MONTH_EN + ' ' + DAY + ', ' + YEAR

      // オブジェクト生成
      this.currentPostDetail = {
        caption: responsePostDetail.caption,
        prefectureName: Object.values(responsePostDetail.prefecture),
        postData: this.postDateByEnglish,
        imageUrl: responsePostDetail.imageUrl,
        likes: responsePostDetail.favorites.length,
      }
      // 現在のpost内容のユーザー情報
      this.currentPostUserInfo = response.data.userinfo
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
          userName: this.$store.getters['user/getLoginUserName'],
          postId: this.givePostId,
        }
      )
      console.dir('いいねresponse:' + JSON.stringify(response))
      this.getPostDetail()
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
