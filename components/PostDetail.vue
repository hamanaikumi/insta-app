<template>
  <div class="w-full py-2">
    <div class="items-center flex flex-row mb-0.5 max-w-full">
      <div class="icon-container">
        <nuxt-link :to="'/UserPage/' + currentPostUserInfo.userId">
          <img
            :src="currentPostUserInfo.icon"
            alt="icon"
            class="h-10 w-10 rounded-full object-cover"
          />
        </nuxt-link>
      </div>
      <div class="top-item-container ml-2">
        <nuxt-link :to="'/UserPage/' + currentPostUserInfo.userId">
          <div class="user-name font-medium text-sm">
            {{ currentPostUserInfo.userName }}
          </div>
        </nuxt-link>
        <div
          class="cursor-pointer font-light text-xs"
          @click="searchPrefecture(currentPostDetail.prefectureName)"
        >
          {{ currentPostDetail.prefectureName }}
        </div>
      </div>
    </div>

    <!-- 投稿画像 2枚以上 -->
    <div>
      <swiper :options="swiperOption" class="c-swiper">
        <swiper-slide
          v-for="url of currentPostDetail.imageUrl"
          :key="url"
          class="images-container w-full"
        >
          <img :src="url" alt="投稿画像" class="max-w-full my-0 mx-auto" />
        </swiper-slide>
        <!-- ページネーションオプション(ドット) -->
        <div
          v-show="currentPostDetail.imageUrl.length > 1"
          slot="pagination"
          class="swiper-pagination swiper-pagination-black"
        ></div>
      </swiper>
    </div>

    <div class="activity-container">
      <div class="flex flex-row">
        <!-- いいねボタン -->
        <!-- いいねする -->
        <button v-show="!likesFlag" type="button" @click="clickLiked()">
          <i class="far fa-heart text-xl animated-hover faa-pulse"></i>
        </button>
        <!-- いいね解除 -->
        <button v-show="likesFlag" type="button" @click="clickUnLiked()">
          <i
            class="fas fa-heart text-xl animated-hover faa-pulse"
            style="color: crimson"
          ></i>
        </button>
        <!-- コメントボタン -->
        <button class="ml-3" @click="openCommentModal()">
          <i class="far fa-comment text-xl"></i>
        </button>
      </div>
      <div class="cursor-pointer" @click="showLikesList()">
        <span>
          Liked by
          <strong> {{ currentPostDetail.likes.length }}</strong> !</span
        >
      </div>
    </div>

    <!-- caption -->
    <div class="font-light">
      <div class="user-name font-normal">
        @{{ currentPostUserInfo.userName }}
      </div>
      <div class="font-light">{{ currentPostDetail.caption }}</div>
      <div class="text-sm">{{ currentPostDetail.postData }}</div>
    </div>
    <!-- コメントモーダル表示 -->
    <CommentsModal
      v-if="showCommentFlag"
      :get-post-id="givePostId"
      @commentClose="closeCommentModal()"
    ></CommentsModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import CommentsModal from '~/components/CommentsModal.vue'

// no-this-in-fetch-data
export default Vue.extend({
  components: { CommentsModal },
  props: {
    // 親コンポーネント（PostModal.vueやHome.vue）から受けたpostID
    givePostId: { type: Number, required: true },
  },
  data() {
    return {
      // 現在取得している投稿
      currentPostDetail: {
        postId: 0,
        caption: '',
        prefectureName: '',
        postData: '',
        imageUrl: [],
        likes: [],
      },
      // 現在取得している投稿のユーザー情報
      currentPostUserInfo: Object,
      // 現在の投稿のいいね
      currentLikes: [],
      // 投稿日時 ENGLISH
      postDateByEnglish: '',
      // いいね する済(true) / 解除する(false)
      likesFlag: false,
      // ログインしてるユーザーID
      loginUserId: 0,
      // ログインしているユーザー名
      loginUserName: '',
      // コメントModalの表示の有無
      showCommentFlag: false,

      // 投稿画像 カルーセル
      swiperOption: {
        // 中略
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },

  created() {
    // poatIDに基づいた投稿詳細内容を取得するメソッド
    this.getPostDetail()

    // 現在ログインしているユーザー名取得
    this.loginUserName = this.$store.getters['user/getLoginUserName']
    this.loginUserId = this.$store.getters['user/getLoginUserId']
  },
  methods: {
    /**
     * いいねリストを表示する.
     */
    showLikesList() {
      this.$store.commit(
        'likesList/getLikesUsers',
        this.currentPostDetail.likes
      )
      this.$router.push('/likesList/' + this.currentPostDetail.postId)
    },
    /**
     * 都道府県をクリックする.
     * @remarks 都道府県をクリックするとその都道府県の投稿一覧へ
     */
    searchPrefecture(prefecture: string) {
      this.$store.commit('searchPrefecture/catchPrefecture', prefecture)
      this.$router.push('/search')
    },
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
      // dateの日にち
      const DAY = DATE.getDate()
      // dateの年
      const YEAR = DATE.getFullYear()
      // 年月日表示 [ 月(英語表記) 日にち , 年  ]
      this.postDateByEnglish = MONTH_EN + ' ' + DAY + ', ' + YEAR

      // 投稿詳細オブジェクト生成
      this.currentPostDetail = {
        postId: this.givePostId,
        caption: responsePostDetail.caption,
        prefectureName: responsePostDetail.prefecture.name,
        postData: this.postDateByEnglish,
        imageUrl: responsePostDetail.imageUrl,
        likes: responsePostDetail.favorites,
      }

      // 現在のpostのユーザー情報
      this.currentPostUserInfo = response.data.userinfo

      // ログインユーザーが各投稿をいいねしているかをuserNameで判断

      const RESULT = this.currentPostDetail.likes.find(
        (name) => name === this.loginUserName
      )
      // .find()の結果一致する名前があればいいね済に
      if (RESULT === this.loginUserName) {
        this.likesFlag = true
      } else {
        this.likesFlag = false
      }
    },

    /**
     * いいねする.
     */
    async clickLiked() {
      // いいね追加APIにpost
      await axios.post('https://api-instagram-app.herokuapp.com/favorite', {
        userName: this.$store.getters['user/getLoginUserName'],
        postId: this.givePostId,
      })
      // いいねフラグをいいね済み(true)に変更
      this.likesFlag = true
      // いいねの表示件数を更新するための処理
      const responseLikes = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.givePostId}`
      )
      // いいねの表示件数更新
      this.currentPostDetail.likes = responseLikes.data.favorites
    },

    /**
     * いいね解除する
     */
    async clickUnLiked() {
      // いいね解除APIにpost
      await axios.post('https://api-instagram-app.herokuapp.com/unfavorite', {
        userName: this.$store.getters['user/getLoginUserName'],
        postId: this.givePostId,
      })
      // いいねフラグをいいね解除(false)に変更
      this.likesFlag = false
      // いいねの表示件数を更新するための処理
      const responseLikes = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.givePostId}`
      )
      // いいねの表示件数更新
      this.currentPostDetail.likes = responseLikes.data.favorites
    },
    /**
     * モーダルでコメント一覧を表示する.
     */
    openCommentModal() {
      this.showCommentFlag = true
    },
    /**
     * モーダルのコメント一覧を閉じる.
     */
    closeCommentModal() {
      this.showCommentFlag = false
    },
  },
})
</script>

<style scoped lang="scss">
// ページネーション
// .images-container {
//   position: relative;

//   .swiper-pagination {
//     position: absolute;
//     left: 50%;
//     bottom: -30px;
//     transform: translateX(-50%);

//   }
// }

.images-container {
  min-height: 15rem;
}
.swiper-container {
  position: relative;
  padding-bottom: 1.2rem;
  .swiper-pagination {
    position: absolute;
    z-index: 10;
    bottom: 0;
  }
}
</style>
