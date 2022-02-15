<template>
  <div class="container mt-5 box-border p-5">
    <div class="post-container">
      <PostDetail :give-post-id="postId"></PostDetail>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import axios from 'axios'
// no-this-in-fetch-data

export default Vue.extend({
  data() {
    return {
      // postID
      postId: 0,

      //   // 現在取得している投稿
      //   currentPostDetail: {
      //     postId: 0,
      //     caption: '',
      //     prefectureName: [],
      //     postData: '',
      //     imageUrl: [],
      //     likes: [],
      //     comments: [],
      //   },

      //   // 現在取得している投稿のユーザー情報
      //   currentPostUserInfo: Object,

      //   // 現在の投稿のいいね数
      //   currentLikes: [],

      //   // 投稿日時 ENGLISH
      //   postDateByEnglish: '',

      //   // いいね する(true) / 解除する(false)
      //   likesFlag: false,

      //   // ログインしているユーザー名
      //   loginUserName: '',

      //   // コメントModalの表示の有無
      //   showCommentFlag: false,
    }
  },

  created() {
    // パラメーターよりpostID取得
    this.postId = parseInt(this.$route.params.id)
    // poatIDに基づいた投稿詳細内容を取得するメソッド
    // this.getPostDetail()

    // 現在ログインしているユーザー名取得
    // this.loginUserName = this.$store.getters['user/getLoginUserName']

    // ログインユーザーがこの投稿をいいねしているかチェック
    // this.likesCheck()
  },

  //   methods: {
  /**
   *  親から渡されたpostIDに基づいて、投稿詳細内容をAPIから取得する.
   */
  // async getPostDetail() {
  //   const response = await axios.get(
  //     `https://api-instagram-app.herokuapp.com/postdetail/${this.postId}`
  //   )
  //   // responseの投稿内容
  //   const responsePostDetail = response.data

  //   // 投稿日時format化
  //   const MONTH_EN_LIST = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ]

  //   // 投稿日時をnew DATE()
  //   const DATE = new Date(responsePostDetail.postData)
  //   // dateから月を取り出してmonthに代入
  //   const month: number = DATE.getMonth()
  //   // MONTH_EN_LISTのmonth番目の要素を代入。<getMonth()は0-11までの整数が返るので、[month-1]とする必要はない >
  //   const MONTH_EN = MONTH_EN_LIST[month]
  //   // dateの日にち
  //   const DAY = DATE.getDate()
  //   // dateの年
  //   const YEAR = DATE.getFullYear()
  //   // 年月日表示 [ 月(英語表記) 日にち , 年  ]
  //   this.postDateByEnglish = MONTH_EN + ' ' + DAY + ', ' + YEAR

  //   //   console.dir(
  //   //     'コメントテーブル' + JSON.stringify(responsePostDetail.comments)
  //   //   )

  //   // 投稿詳細オブジェクト生成
  //   this.currentPostDetail = {
  //     postId: responsePostDetail.postId,
  //     caption: responsePostDetail.caption,
  //     prefectureName: Object.values(responsePostDetail.prefecture),
  //     postData: this.postDateByEnglish,
  //     imageUrl: responsePostDetail.imageUrl,
  //     likes: responsePostDetail.favorites,
  //     comments: responsePostDetail.comments,
  //   }
  //   // 現在のpostのユーザー情報
  //   this.currentPostUserInfo = response.data.userinfo
  // },

  /**
   * いいねチェック
   */
  // likesCheck() {
  //   // ログインユーザーが各投稿をいいねしているかを判断
  //   // Array.every()が true/false で返してくれる
  //   const RESULT = this.currentPostDetail.likes.every((userName) => {
  //     return userName === this.loginUserName
  //   })
  //   if (RESULT === true) {
  //     this.likesFlag = true
  //   } else if (RESULT === false) {
  //     this.likesFlag = false
  //   }
  //     // },

  //     /**
  //      * いいねする.
  //      *
  //      */
  //     async clickLiked() {
  //       // いいね追加APIにpost
  //       await axios.post('https://api-instagram-app.herokuapp.com/favorite', {
  //         userName: this.$store.getters['user/getLoginUserName'],
  //         postId: this.postId,
  //       })

  //       //   // いいねフラグをいいね済み(true)に変更
  //       this.likesFlag = true

  //       //   // いいねの表示件数を更新するための処理
  //       const responseLikes = await axios.get(
  //         `https://api-instagram-app.herokuapp.com/postdetail/${this.postId}`
  //       )
  //       // いいねの表示件数更新
  //       this.currentPostDetail.likes = responseLikes.data.favorites
  //     },

  //     /**
  //      * いいね解除する
  //      */
  //     async clickUnLiked() {
  //       // いいね解除APIにpost
  //       await axios.post('https://api-instagram-app.herokuapp.com/unfavorite', {
  //         userName: this.$store.getters['user/getLoginUserName'],
  //         postId: this.postId,
  //       })

  //       //   // いいねフラグをいいね解除(false)に変更
  //       this.likesFlag = false

  //       //   // いいねの表示件数を更新するための処理
  //       const responseLikes = await axios.get(
  //         `https://api-instagram-app.herokuapp.com/postdetail/${this.postId}`
  //       )
  //       // いいねの表示件数更新
  //       this.currentPostDetail.likes = responseLikes.data.favorites
  //     },

  //     /**
  //      * モーダルでコメント一覧を表示する.
  //      */
  //     openCommentModal() {
  //       this.showCommentFlag = true
  //     },
  //     /**
  //      * モーダルのコメント一覧を閉じる.
  //      */
  //     closeCommentModal() {
  //       this.showCommentFlag = false
  //     },
  //   },
})
</script>

<style scoped lang="scss">
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
  min-height: 17.5rem;
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
</style>
