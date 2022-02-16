<template>
  <div class="container mt-5 box-border p-5">
    <!-- プロフィール -->
    <div class="user-information">
      <div class="icon-follow flex flex-row items-center justify-between">
        <div class="icon">
          <img :src="userInformation.icon" class="w-20 h-20 rounded-full" />
        </div>
        <div class="follow-information w-2/4 flex flex-row justify-between">
          <div class="posts-number text-center p-1">
            <span class="font-medium">{{ numberOfPost }}</span>
            <br />
            <span class="text-xs">投稿数</span>
          </div>
          <nuxt-link
            to="/FollowFollower"
            class="folower-number text-center p-1"
          >
            <span class="font-medium">{{ numberOfFollower }}</span>
            <br />
            <span class="text-xs">フォロワー</span>
          </nuxt-link>
          <nuxt-link to="/FollowFollower" class="folow-number text-center p-1">
            <span class="font-medium">{{ numberOfFollow }}</span>
            <br />
            <span class="text-xs">フォロー</span>
          </nuxt-link>
        </div>
      </div>
      <div class="bio-contents py-2.5">
        <span class="font-medium">{{ userInformation.userName }}</span>
        <br />
        <span class="text-sm">{{ userInformation.bio }}</span>
      </div>
    </div>
    <!-- コンテンツ -->
    <div class="tab-wrap">
      <input
        id="TAB-01"
        type="radio"
        name="TAB"
        class="tab-switch"
        checked="checked"
      /><label class="tab-label" for="TAB-01"
        ><i class="fas fa-border-all"></i
      ></label>
      <div class="tab-content">
        <Post :post-informations="myPosts"></Post>
      </div>
      <input id="TAB-02" type="radio" name="TAB" class="tab-switch" /><label
        class="tab-label"
        for="TAB-02"
        ><i class="fas fa-map-marker-alt"></i
      ></label>
      <div class="tab-content">
        <Prefecture :posted-prefectures="postedPrefectures"></Prefecture>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '~/components/Post.vue'
import Prefecture from '~/components/Prefecture.vue'

export default {
  components: {
    Post,
    Prefecture,
  },
  data() {
    return {
      // 対象ユーザーのid
      userId: -1,
      // ログイン中のユーザー情報
      userInformation: {},
      // ログインユーザーの投稿一覧
      myPosts: [],
      // フォロー数
      numberOfFollow: 0,
      // フォロワー数
      numberOfFollower: 0,
      // 投稿数
      numberOfPost: 0,
      // 投稿に紐づいた都道府県情報
      postedPrefectures: [],
    }
  },
  created() {
    // パラメーターよりuserID取得
    this.userId = parseInt(this.$route.params.id)
    this.asyncPost()
  },
  methods: {
    /**
     * ログイン中のユーザーidを基にAPIからユーザー情報、投稿一覧を取得してdataに格納.
     */
    async asyncPost() {
      const response = await this.$axios.$get(
        `https://api-instagram-app.herokuapp.com/mypage/${this.userId}`
      )
      this.userInformation = response.user
      this.myPosts = response.post
      this.numberOfFollow = response.user.follow.length
      this.numberOfFollower = response.user.follower.length
      this.numberOfPost = response.post.length
      this.getPostedPrefecture()
    },
    /**
     * 子コンポーネントに渡す用の、投稿された都道府県配列を作成.
     */
    getPostedPrefecture() {
      const prefectures = []
      for (const myPost of this.myPosts) {
        prefectures.push(myPost.prefecture)
      }
      this.postedPrefectures = Array.from(new Set(prefectures))
    },
  },
}
</script>

<style scoped>
.tab-wrap {
  background: White;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0 0 20px;
}

.tab-label {
  color: rgb(190, 187, 187);
  cursor: pointer;
  flex: 1;
  font-weight: bold;
  order: -1;
  padding: 12px 24px;
  position: relative;
  text-align: center;
  transition: cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
  user-select: none;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

/* .tab-label:hover {
  background: rgba(0, 191, 255, 0.1);
} */

.tab-switch:checked + .tab-label {
  color: black;
}

.tab-label::after {
  background: black;
  bottom: 0;
  content: '';
  display: block;
  height: 3px;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translateX(100%);
  transition: cubic-bezier(0.4, 0, 0.2, 1) 0.2s 80ms;
  width: 100%;
  z-index: 1;
}

.tab-switch:checked ~ .tab-label::after {
  transform: translateX(-100%);
}

.tab-switch:checked + .tab-label::after {
  opacity: 1;
  transform: translateX(0);
}

.tab-content {
  height: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-30%);
  transition: transform 0.3s 80ms, opacity 0.3s 80ms;
  width: 100%;
}

.tab-switch:checked ~ .tab-content {
  transform: translateX(30%);
}

.tab-switch:checked + .tab-label + .tab-content {
  height: auto;
  opacity: 1;
  order: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.tab-switch {
  display: none;
}
</style>
