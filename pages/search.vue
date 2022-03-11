<template>
  <div class="flex flex-wrap w-full">
    <form class="my-8 w-full flex justify-center flex-wrap">
      <div class="w-full flex justify-center my-2 h-8">
        <input
          v-model="searchWord"
          class="focus:outline-none p-2 border-b-2"
          type="text"
          placeholder=" Search..."
        />
        <button type="button" class="border-b-2 w-8" @click="onSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="w-full flex justify-center my-2">
        <div class="mx-2">
          <input
            id="keyword"
            v-model="display"
            type="radio"
            name="searchType"
            value="keyword"
            class="bg-gray-300"
          />
          <label for="keyword"> Keyword </label>
        </div>
        <div class="mx-2">
          <input
            id="account"
            v-model="display"
            type="radio"
            name="searchType"
            value="account"
          />
          <label for="account"> Account </label>
        </div>
        <div class="mx-2">
          <input
            id="prefecture"
            v-model="display"
            type="radio"
            name="searchType"
            value="prefecture"
          />
          <label for="prefecture"> Prefecture </label>
        </div>
      </div>
    </form>
    <!-- 写真表示用 -->
    <div v-if="display === 'keyword'" class="w-full">
      <div v-if="keyErrorMessage" class="w-full flex justify-center">
        {{ errorMessage }}
      </div>
      <div class="w-full grid grid-cols-3">
        <div v-for="(item, i) of displayCaptionList" :key="i">
          <router-link :to="'/postDetail/' + item.postId">
            <div class="m-px flex justify-center">
              <img :src="displayCaptionList[i].imageUrl[0]" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- ここまで -->
    <!-- アカウント表示用 -->
    <div v-else-if="display === 'account'" class="w-full">
      <div v-if="accErrorMessage" class="w-full flex justify-center">
        {{ errorMessage }}
      </div>
      <div class="w-full">
        <div v-for="(item, i) of displayAccountList" :key="i">
          <AccountList ref="accountList" :user="item" ff='"fFFFf"+i' />
        </div>
      </div>
    </div>
    <!-- ここまで -->
    <!-- 都道府県表示用 -->
    <div v-else-if="display === 'prefecture'" class="w-full">
      <div v-if="preErrorMessage" class="w-full flex justify-center">
        {{ errorMessage }}
      </div>
      <div class="w-full grid grid-cols-3">
        <div v-for="(item, i) of displayPrefectureList" :key="i">
          <!-- ルーターリンクは投稿詳細に飛ぶ -->
          <router-link :to="'/postDetail/' + item.postId">
            <div class="m-px flex justify-center">
              <img :src="displayPrefectureList[i].imageUrl[0]" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- ここまで -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AccountList from '~/components/AccountList.vue'

export default Vue.extend({
  name: 'SearchPage',

  components: {
    AccountList,
  },

  middleware: 'auth',
  data() {
    return {
      // 表示切り替え用
      display: 'keyword',
      // FollowFollowingボタン
      button: 'Follow',
      // Followしていない
      follow: true,
      // Followしている
      following: false,
      // エラーメッセージ表示用
      keyErrorMessage: false,
      accErrorMessage: false,
      preErrorMessage: false,
      errorMessage: '',
      // 検索表示用
      displayCaptionList: [],
      displayAccountList: [],
      displayPrefectureList: [],
      // 検索ワード
      searchWord: '',
      // keyword検索用
      searchCaptionUrl:
        'https://api-instagram-app.herokuapp.com/search/caption',
      // アカウント検索用
      searchAccountUrl:
        'https://api-instagram-app.herokuapp.com/search/account',
      // 都道府県検索用
      searchPrefectureUrl:
        'https://api-instagram-app.herokuapp.com/search/prefecture',
      // 全件表示用
      allPostsUrl: 'https://api-instagram-app.herokuapp.com/allposts',
      // 仮のユーザーID
      userId: 3,
      // 遷移元のパス名
      referrerPath: '',
    }
  },
  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },
  created() {
    // 投稿詳細画面から画面遷移したかを取得
    this.referrerPath = this.$store.getters['searchPrefecture/getReferrerPath']

    // 投稿詳細画面から都道府県名クリックの結果表示
    if (this.referrerPath === 'home' || this.referrerPath === 'postDetail-id') {
      // 投稿詳細から取得した都道府県
      const PREFECTURE_NAME: any =
        this.$store.getters['searchPrefecture/getPrefectureName']
      // searchPrefectureのstateが空欄じゃない時の処理
      if (PREFECTURE_NAME !== '') {
        this.display = 'prefecture'
        this.searchWord = PREFECTURE_NAME
        this.onSearch()
      }
      // searchPrefectureのstateを初期化
      this.$store.commit('searchPrefecture/catchPath', '')
    }
  },
  mounted() {
    if (this.referrerPath === '') {
      this.$nextTick(() => {
        // ローディング開始
        this.$nuxt.$loading.start()
        // 全投稿情報を取得
        this.$axios.$get(this.allPostsUrl).then((res: any) => {
          this.displayCaptionList = res
          this.displayPrefectureList = res
          // 初期表示の写真をランダムに並べ替え
          this.shuffleArray(this.displayCaptionList)
          this.shuffleArray(this.displayPrefectureList)
        })
        // ローディング終了
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    }
  },

  updated() {
    this.displayAccountList.length = 0
  },

  methods: {
    // 画像シャッフル用
    shuffleArray(inputArray: any[]) {
      inputArray.sort(() => Math.random() - 0.5)
    },

    /**
     * 検索機能
     */
    async onSearch() {
      // ローディング開始
      this.$nuxt.$loading.start()
      if (this.display === 'keyword') {
        this.accErrorMessage = false
        this.preErrorMessage = false
        this.keyErrorMessage = false
        /**
         * キーワード検索機能
         */
        await this.$axios
          .$post(this.searchCaptionUrl, { caption: this.searchWord })
          .then((res: any) => {
            if (res.status === 'error') {
              this.displayCaptionList.length = 0
              this.keyErrorMessage = true
              this.errorMessage = res.message
            } else if (this.searchWord === '') {
              this.displayCaptionList = res
              this.shuffleArray(this.displayCaptionList)
            } else {
              this.displayCaptionList = res
            }
          })
      } else if (this.display === 'account') {
        this.keyErrorMessage = false
        this.accErrorMessage = false

        /**
         * アカウント検索機能
         */
        await this.$axios
          .$post(this.searchAccountUrl, { userName: this.searchWord })
          .then((res: any) => {
            // 検索結果がなかった時
            if (res.status === 'error') {
              this.displayAccountList.length = 0
              this.accErrorMessage = true
              this.errorMessage = res.message
              // 検索結果があったとき
            } else if (this.searchWord === '') {
              this.accErrorMessage = true
              this.errorMessage = '検索ワードを入力してください'
            } else {
              this.displayAccountList = res
            }
          })
      } else if (this.display === 'prefecture') {
        this.keyErrorMessage = false
        this.accErrorMessage = false
        this.preErrorMessage = false

        /**
         * 都道府県検索機能
         */
        await this.$axios
          .$post(this.searchPrefectureUrl, { prefecture: this.searchWord })
          .then((res: any) => {
            if (res.status === 'error') {
              this.displayPrefectureList.length = 0
              this.preErrorMessage = true
              this.errorMessage = res.message
            } else if (this.searchWord === '') {
              this.displayPrefectureList = res
              this.shuffleArray(this.displayPrefectureList)
            } else {
              this.displayPrefectureList = res
            }
          })
      }
      // ローディング終了
      this.$nuxt.$loading.finish()
    },
  },
})
</script>
<style scoped></style>
