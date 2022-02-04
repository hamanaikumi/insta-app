<template>
  <div class="flex flex-wrap">
    <form class="my-8">
      <div class="w-screen flex justify-center my-2 h-8">
        <input
          class="bg-gray-300 rounded-md"
          type="search"
          placeholder=" Search..."
        />
        <!--FontAwesomeから虫眼鏡の画像-->
        <button class="bg-green-500 rounded-md">検索</button>
      </div>
      <!-- 写真表示用 -->
      <div class="w-screen flex justify-center my-2">
        <!-- <div class="flex justify-center inline-block align-middle"> -->
        <div class="mx-2">
          <input
            id="keyword"
            v-model="display"
            type="radio"
            name="searchType"
            value="keyword"
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
    <div
      v-if="display === 'keyword' || display === 'prefecture'"
      class="w-screen grid grid-cols-3"
    >
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
    }
  },
  //  },
  //  computed: {
  //  },
  //  mounted () {
  //  },
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
  },
  //  created () {
  //    console.log('CLICK!!!')// eslint-disable-line
  //  },
})
</script>
