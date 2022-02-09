<template>
  <div class="flex flex-wrap w-screen">
    <form class="my-8">
      <div class="w-screen flex justify-center my-2 h-8">
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
      <div class="w-screen flex justify-center my-2">
        <!-- <div class="flex justify-center inline-block align-middle"> -->
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
    <div v-if="showErrorMessage" class="w-screen flex justify-center">
      {{ errorMessage }}
    </div>
    <!-- <div>{{ errorMessage }}</div> -->
    <div v-if="display === 'keyword'" class="w-screen grid grid-cols-3">
      <div v-for="(item, i) of displayCaptionList" :key="i">
        <div class="m-px flex justify-center">
          <img :src="displayCaptionList[i].imageUrl[0]" />
        </div>
      </div>
    </div>
    <!-- ここまで -->
    <!-- アカウント表示用 -->
    <div v-if="display === 'account'">
      <div v-for="(item, i) of displayAccountList" :key="i">
        <div class="flex w-screen my-1">
          <div class="w-1/4 flex justify-center flex-none self-center">
            <img :src="displayAccountList[i].icon" class="rounded-full w-16" />
          </div>
          <div class="flex-grow self-center">
            {{ displayAccountList[i].userName }}
          </div>
          <div class="flex-none self-center">
            <button
              v-if="follow"
              class="bg-green-500 w-24 h-8 mx-2 rounded-md"
              @click="onClick"
            >
              {{ button }}
            </button>
            <button
              v-if="following"
              class="bg-gray-100 w-24 h-8 mx-2 rounded-md"
              @click="onClick"
            >
              {{ button }}
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <!-- ここまで -->
    <!-- 都道府県表示用 -->
    <div v-if="display === 'prefecture'" class="w-screen grid grid-cols-3">
      <div v-for="(item, i) of displayPrefectureList" :key="i">
        <div class="m-px flex justify-center">
          <img :src="displayPrefectureList[i].imageUrl[0]" />
        </div>
      </div>
    </div>
    <!-- ここまで -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import axios from 'axios'

export default Vue.extend({
  name: 'SearchPage',
  //  components: {
  //  },
  //    props: {
  //  },
  data() {
    return {
      // 表示切り替え用
      display: 'keyword',
      // FollowFollowingボタン
      button: 'Follow',
      // Followしていない
      follow: true,
      // Followしていない
      following: false,
      // エラーメッセージ表示用
      showErrorMessage: false,
      errorMessage: '',
      // 初期データ
      captionList: [],
      accountList: [],
      prefectureList: [],
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
      // フォロー用
      followUrl: 'https://api-instagram-app.herokuapp.com/follow',
      // フォロー解除用
      unfollow: 'https://api-instagram-app.herokuapp.com/unfollow',
    }
  },
  computed: {},
  mounted() {
    /**
     * 全投稿情報を取得
     */
    this.$axios.$get(this.allPostsUrl).then((res) => {
      this.displayCaptionList = res
      this.displayPrefectureList = res
    })
  },
  methods: {
    onClick() {
      if (this.follow) {
        this.button = 'Following'
        this.follow = false
        this.following = true
      } else {
        this.button = 'Follow'
        this.follow = true
        this.following = false
      }
    },
    async onSearch() {
      this.displayCaptionList.length = 0
      this.displayAccountList.length = 0
      this.prefectureList.length = 0

      if (this.display === 'keyword') {
        /**
         * キーワード検索機能
         */
        await this.$axios
          .$post(this.searchCaptionUrl, { caption: this.searchWord })
          .then((res) => {
            if (res.status === 'error') {
              this.displayCaptionList.length = 0
              this.showErrorMessage = true
              this.errorMessage = res.message
            } else {
              this.showErrorMessage = false

              this.displayCaptionList = res
              console.dir('key:' + JSON.stringify(this.displayPrefectureList))
            }
          })
      } else if (this.display === 'account') {
        /**
         * アカウント検索機能
         */
        await this.$axios
          .$post(this.searchAccountUrl, { userName: this.searchWord })
          .then((res) => {
            if (res.status === 'error') {
              this.displayAccountList.length = 0
              this.showErrorMessage = true
              this.errorMessage = res.message
              //   console.dir('上:' + JSON.stringify(this.displayAccountList))
            } else {
              this.showErrorMessage = false

              this.displayAccountList = res
              //   console.dir('した:' + JSON.stringify(this.displayAccountList))
            }
            // if (res.length >= 1) {
            //   this.displayAccountList = res
            // } else {
            //   this.errorMessage = res.message
            // }
            // console.dir('accsuccess:' + JSON.stringify(this.displayAccountList))
          })
        //   .catch((error) => {
        //     // this.errorMessage = error.message
        //     console.dir('err:' + error.res)
        //   })
      } else if (this.display === 'prefecture') {
        /**
         * 都道府県検索機能
         */
        await this.$axios
          .$post(this.searchPrefectureUrl, { prefecture: this.searchWord })
          .then((res) => {
            if (res.status === 'error') {
              this.displayPrefectureList.length = 0
              this.showErrorMessage = true
              this.errorMessage = res.message
            } else {
              this.showErrorMessage = false
              this.displayPrefectureList = res
              console.dir('pre:' + JSON.stringify(this.displayPrefectureList))
            }
          })
      }
    },
  },
  //  created () {
  //    console.log('CLICK!!!')// eslint-disable-line
  //  },
})
</script>
<style scoped>
html {
  margin: 0;
}
</style>
