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
        <!-- <button type="button" class="border-b-2 w-8" @click="ononSearch">
          <i class="fas fa-search"></i>
        </button> -->
      </div>
      <div class="w-screen flex justify-center my-2">
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
      <!-- <div v-show="showErrorMessage" class="w-screen flex justify-center"> -->
      {{ errorMessage }}
    </div>
    <div v-show="display === 'keyword'" class="w-screen grid grid-cols-3">
      <!-- <div v-if="display === 'keyword'" class="w-screen grid grid-cols-3"> -->
      <div v-for="(item, i) of displayCaptionList" :key="i">
        <!-- ルーターリンクは投稿詳細に飛ぶ -->
        <router-link :to="'/postDetail/' + item.postId">
          <div class="m-px flex justify-center">
            <img :src="displayCaptionList[i].imageUrl[0]" />
          </div>
        </router-link>
      </div>
    </div>
    <!-- ここまで -->
    <!-- アカウント表示用 -->
    <!-- <div v-else-if="display === 'account'"> -->
    <div v-show="display === 'account'">
      <div v-for="(item, i) of displayAccountList" :key="i">
        <AccountList ref="accountList" :user="displayAccountList[i]" />
        <!-- <AccountList :ref="accountList + i" :user="displayAccountList[i]" /> -->
      </div>
    </div>
    <!-- ここまで -->
    <!-- 都道府県表示用 -->
    <!-- <div v-else-if="display === 'prefecture'" class="w-screen grid grid-cols-3"> -->
    <div v-show="display === 'prefecture'" class="w-screen grid grid-cols-3">
      <div v-for="(item, i) of displayPrefectureList" :key="i">
        <!-- ルーターリンクは投稿詳細に飛ぶ -->
        <router-link :to="'/postDetail/' + item.postId">
          <div class="m-px flex justify-center">
            <img :src="displayPrefectureList[i].imageUrl[0]" />
          </div>
        </router-link>
      </div>
    </div>
    <!-- ここまで -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AccountList from '~/components/AccountList.vue'
// import axios from 'axios'

export default Vue.extend({
  name: 'SearchPage',

  components: {
    AccountList,
  },

  data() {
    return {
      // 表示切り替え用
      display: 'account',
      // FollowFollowingボタン
      button: 'Follow',
      // Followしていない
      follow: true,
      // Followしている
      following: false,
      // エラーメッセージ表示用
      showErrorMessage: false,
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
      //
      // recreated(): void {},
    }
  },
  computed: {},
  created() {
    /**
     * 全投稿情報を取得
     */
    this.$axios.$get(this.allPostsUrl).then((res) => {
      this.displayCaptionList = res
      this.displayPrefectureList = res
    })
    console.log('親:created')
  },
  mounted() {
    // Vue.nextTick(() => {
    ;(this.$refs.accountList as InstanceType<typeof AccountList>).recreated()
    // })
    // ;(this.$refs.accountList as InstanceType<typeof AccountList>).recreated()
  },
  methods: {
    // get refs(): any {
    //   return this.$refs
    // },
    // ononSearch() {
    //   console.log('オンおんサーチ')
    //   // this.refs().accountList.recreated()
    //   ;(this.$refs.accountList as InstanceType<typeof AccountList>).recreated()
    //   // this.$refs.accountList.recreated()
    //   // ;(this.$refs as any).accountList.recreated()
    //   // const accountList = <typeof AccountList>this.$refs.accountList
    //   // accountList.recreated()
    //   // (this.$refs.accountList as HTMLInputElement).recreated()
    // },
    /**
     * 検索機能
     */

    async onSearch() {
      // ;(this.$refs.accountList as InstanceType<typeof AccountList>).recreated()

      // ;(this.$refs.accountList as InstanceType<typeof AccountList>).recreated()

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
            }
          })
      } else if (this.display === 'account') {
        /**
         * アカウント検索機能
         */

        await this.$axios
          .$post(this.searchAccountUrl, { userName: this.searchWord })
          .then((res) => {
            // 検索結果がなかった時
            if (res.status === 'error') {
              this.displayAccountList.length = 0
              this.showErrorMessage = true
              this.errorMessage = res.message
              // 検索結果があったとき
            } else {
              this.showErrorMessage = false
              this.displayAccountList = res
            }
          })
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
            }
          })
      }
    },
  },
})
</script>
<style scoped></style>
