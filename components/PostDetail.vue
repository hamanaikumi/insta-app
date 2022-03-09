<template>
  <div class="w-full py-2">
    <div class="items-center flex flex-row mb-0.5 max-w-full">
      <div class="flex justify-between w-full items-center">
        <!-- icon skeleton screen -->
        <div v-if="skeleton" class="flex items-center animate-pulse w-full">
          <div class="bg-gray-200 h-10 w-10 rounded-full"></div>
          <div class="h-3 bg-gray-200 rounded w-1/6"></div>
        </div>

        <div v-if="skeleton === false" class="flex">
          <!-- ユーザーアイコン-->
          <div class="h-10 w-10 rounded-full">
            <button
              type="button"
              @click="jumpUserPage(currentPostUserInfo.userId)"
            >
              <img
                :src="currentPostUserInfo.icon"
                class="object-cover h-10 w-10 rounded-full"
                @error="errorImg"
              />
            </button>
          </div>

          <div class="top-item-container ml-2">
            <button
              type="button"
              @click="jumpUserPage(currentPostUserInfo.userId)"
            >
              <div class="user-name font-medium text-sm">
                {{ currentPostUserInfo.userName }}
              </div>
            </button>
            <div class="flex justify-between">
              <div
                v-if="skeleton === false"
                class="prefecture-name font-light text-xs cursor-pointer"
                @click="searchPrefecture(currentPostDetail.prefectureName)"
              >
                {{ currentPostDetail.prefectureName }}
              </div>
            </div>
          </div>
        </div>
        <!-- 投稿削除 -->
        <div class="overflow-visible z-10">
          <DeletePost
            v-if="loginUserId === currentPostUserInfo.userId"
            :post-id="givePostId"
            :post-image-url="currentPostDetail.imageUrl"
            @update="emitUpdate"
          />
        </div>
      </div>
    </div>
    <!-- 投稿画像  -->
    <!-- postImages skeleton screen -->
    <div v-if="skeleton" class="img-skeleton bg-gray-200 animate-pulse"></div>

    <div v-if="skeleton === false" class="c-img" @dblclick="clickLiked()">
      <swiper :options="swiperOption" class="c-swiper">
        <swiper-slide
          v-for="url of currentPostDetail.imageUrl"
          :key="url"
          class="images-container w-full pb-5 relative"
        >
          <img :src="url" alt="投稿画像" class="max-w-full my-0 mx-auto" />
        </swiper-slide>
        <!-- ページネーションオプション(ドット) -->
        <div
          v-show="currentPostDetail.imageUrl.length > 1"
          slot="pagination"
          class="swiper-pagination swiper-pagination-black absolute"
        ></div>
      </swiper>
      <!-- いいねすると表示されるハート -->
      <transition name="heart">
        <span v-if="showHeartFlag" class="show-heart">
          <i class="fas fa-heart text-7xl" style="color: white"></i>
        </span>
      </transition>
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

      <div
        v-if="currentPostDetail.likes.length !== 0 && skeleton === false"
        class="cursor-pointer"
        @click="showLikesList()"
      >
        <span>
          Liked by
          <strong>{{ currentPostDetail.likes[0] }}</strong>
          <span v-if="currentPostDetail.likes.length > 1">
            and
            <strong>
              {{ currentPostDetail.likes.length - 1 }}
            </strong>
            others !
          </span>
        </span>
      </div>
    </div>

    <!-- caption -->
    <div class="font-light">
      <div class="user-name font-normal">
        <strong>
          <button
            type="button"
            class="font-bold"
            @click="jumpUserPage(currentPostUserInfo.userId)"
          >
            {{ currentPostUserInfo.userName }}
          </button>
        </strong>
      </div>
      <!-- caption skeleton screen -->
      <div v-if="skeleton" class="space-y-2 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
        <div class="h-3 bg-gray-200 rounded w-4/6"></div>
        <div class="h-3 bg-gray-200 rounded w-4/6"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
        <div class="h-3 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div class="font-normal py-1">{{ currentPostDetail.caption }}</div>
      <!-- コメント１件のとき -->
      <div
        v-if="commentCount === 1"
        class="text-sm text-light-gray"
        @click="openCommentModal()"
      >
        View all {{ commentCount }} comment
      </div>
      <!-- コメント２件以上のとき -->
      <div
        v-if="commentCount > 1"
        class="text-sm text-light-gray"
        @click="openCommentModal()"
      >
        View all {{ commentCount }} comments
      </div>
      <div class="text-sm">{{ currentPostDetail.postData }}</div>
    </div>
    <!-- コメントモーダル表示 -->
    <CommentsModal
      v-if="showCommentFlag"
      ref="commentComponent"
      :get-post-id="givePostId"
      :post-user-id="currentPostUserInfo.userId"
      @commentClose="closeCommentModal()"
      @getCommentCount="commentCount = $event"
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
      // 投稿日時 ENGLISH
      postDateByEnglish: '',
      // いいね する済(true) / 解除する(false)
      likesFlag: false,
      // いいねした時のハートを表示するためのフラグ
      showHeartFlag: false,
      // ログインしてるユーザーID
      loginUserId: 0,
      // ログインしているユーザー名
      loginUserName: '',
      // コメントModalの表示の有無
      showCommentFlag: false,
      // コメント数
      commentCount: 0,
      // スケルトンスクリーン
      skeleton: true,

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
      // クリックされた都道府県をstoreへ
      this.$store.commit('searchPrefecture/catchPrefecture', prefecture)
      // 現在のページのpath名をstoreへ
      this.$store.commit('searchPrefecture/catchPath', this.$route.name)
      // 都道府県検索画面へ画面遷移
      this.$router.push('/search')
    },

    /**
     *  親から渡されたpostIDに基づいて、投稿詳細内容をAPIから取得する.
     */
    async getPostDetail() {
      const response = await axios.get(
        `https://api-instagram-app.herokuapp.com/postdetail/${this.givePostId}`
      )
      // スケルトンスクリーン非表示に
      this.skeleton = false

      // responseの投稿内容
      const resPostDetail = response.data

      // 現在のコメント数取得
      const resComments = response.data.comments
      this.commentCount = resComments.length

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
      const DATE = new Date(resPostDetail.postData)
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
        caption: resPostDetail.caption,
        prefectureName: resPostDetail.prefecture.name,
        postData: this.postDateByEnglish,
        imageUrl: resPostDetail.imageUrl,
        likes: resPostDetail.favorites,
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
      this.showHeartFlag = true
      setTimeout(() => {
        this.showHeartFlag = false
      }, 1)
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
      // this.showHeartFlag = false
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

    /**
     * アイコンが設定されていない時
     */
    errorImg(element: any) {
      element.target.src = '/images/user.png'
    },
    /**
     * 親コンポーネント(home.vue)のイベントを発火し、ホーム画面を更新する.
     */
    emitUpdate() {
      this.$emit('update')
    },
    /**
     * リンク先が自分のプロフィールの場合とリンク先を分ける.
     *
     * @param targetId - リンク先のユーザーid
     */
    jumpUserPage(targetId: number) {
      if (this.loginUserId === targetId) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/userPage/' + targetId)
      }
    },
  },
})
</script>

<style scoped lang="scss">
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0px;
}
.img-skeleton {
  width: 100%;
  height: 50vh;
}
.c-img {
  position: relative;
  .show-heart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
}
// いいねしたとに表示されるハート
.heart-leave-active {
  transition: opacity 2s;
}
.heart-after-enter {
  transition-duration: 0.7s;
  transform: scale(1.2);
  opacity: 0.6;
}
.heart-leave {
  opacity: 1;
}
.heart-leave-to {
  opacity: 0;
}
</style>
