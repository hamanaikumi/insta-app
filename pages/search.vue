<template>
  <div class="flex flex-wrap">
    <form class="my-8">
      <div class="w-screen flex justify-center my-2 h-8">
        <input
          v-model="searchWord"
          class="bg-gray-300 rounded-md"
          type="search"
          placeholder=" Search..."
        />
        <!--FontAwesomeから虫眼鏡の画像-->
        <button class="bg-green-500 rounded-md">検索</button>
        <!-- <button class="bg-green-500 rounded-md" @click="onSearch">検索</button> -->
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
      {{ data }}
    </form>
    <!-- 写真表示用 -->
    <div
      v-if="display === 'keyword' || display === 'prefecture'"
      class="w-screen grid grid-cols-3"
    >
      <div class="m-px flex justify-center">
        <img :src="imageUrl" />
      </div>

      <div class="m-px flex justify-center">
        <img src="https://picsum.photos/300/" />
      </div>

      <div class="m-px flex justify-center">
        <img src="http://placehold.it/200/" />
      </div>
      <div class="m-px flex justify-center">
        <img src="http://placehold.it/100" />
      </div>
      <div class="m-px flex justify-center">
        <img src="http://placehold.it/300" />
      </div>
      <div class="m-px flex justify-center">
        <img src="http://placehold.it/300" />
      </div>
      <div class="m-px flex justify-center">
        <img src="http://placehold.it/300" />
      </div>
      <div class="m-px flex justify-center">
        <img src="http://placehold.it/300" />
      </div>
    </div>
    <!-- アカウント表示用 -->
    <div v-if="display === 'account'">
      <div class="flex w-screen my-1">
        <div class="w-1/4 flex justify-center flex-none self-center">
          <img :src="imageUrl" class="rounded-full w-16" />
        </div>
        <div class="flex-grow self-center">アカウント名</div>
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
      <div class="flex w-screen my-1">
        <div class="w-1/4 flex justify-center flex-none self-center">
          <img src="http://placehold.it/200/" class="rounded-full w-16" />
        </div>
        <div class="flex-grow self-center">なが〜〜〜いアカウント名</div>
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
      <div class="flex w-screen my-1">
        <div class="w-1/4 flex justify-center flex-none self-center">
          <img src="http://placehold.it/200/" class="rounded-full w-16" />
        </div>
        <div class="flex-grow self-center">アカウント名</div>
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SearchPage',
  //  components: {
  //  },
  //    props: {
  //  },
  data() {
    return {
      display: 'keyword',
      button: 'Follow',
      follow: true,
      following: false,
      imageUrl:
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
      data: [],
      displayList: [] as unknown,
      searchWord: '',
      data1: ['たい焼き', 'たこ焼き', '苺'],
    }
  },
  //  },
  computed: {
    //         onSearch(){
    // //                 const data = ['たい焼き', 'たこ焼き', '苺'];
    // //    const displayList = data.filter((item)=>{
    // //         return item.includes("焼き")
    //   }
  },
  mounted() {
    this.data = this.$store.state.sample.post
    // this.data = JSON.stringify(this.$store.state.sample.post)
    // this.data = this.$store.state.sample.post
    // console.log('data' + this.data.length)
    // if (this.display === 'keyword') {
    //   this.displayList = this.data.filter((item) => {
    //     return item.length > 2
    //   })
    //   for (const it of this.data) {
    //     //   console.log('item:' + item)
    //     //   console.log(this.displayList)
    //     this.displayList = it.filter(item =>
    //      item.caption.includes(this.searchWord)
    //     )
    //     // this.displayList = item
    //     //   this.displayList = this.item.filter((item) =>
    //     //     item.name.toUpperCase().includes(this.searchWord.toUpperCase())
    //     //   )
    //   }
    // }
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
    // onSearch() {
    //   this.displayList = this.data.filter((item) => {
    //     return item.includes(this.searchWord)
    //     // return item.indexOf(this.searchWord)
    //   })
    // },
    // onSearch() {
    //   //   if (this.display === 'keyword') {
    //   //     this.data = this.$store.state.sample.post
    //   //     console.log('data' + this.data.length)
    //   //     for (const item of this.data) {
    //   //       //   console.log('item:' + item)
    //   //       //   console.log(this.displayList)
    //   //       this.displayList = JSON.stringify(item)
    //   //       console.log('DL' + this.displayList)
    //   //       // this.displayList = item
    //   //       //   this.displayList = this.item.filter((item) =>
    //   //       //     item.name.toUpperCase().includes(this.searchWord.toUpperCase())
    //   //       //   )
    //   //     }
    //   //   }
    // },
  },
  //  created () {
  //    console.log('CLICK!!!')// eslint-disable-line
  //  },
})
</script>
