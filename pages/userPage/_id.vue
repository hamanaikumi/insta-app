<template>
  <div class="container mt-5 box-border p-5">
    <!-- profile skeleton screen -->
    <div v-if="skeleton" class="animate-pulse">
      <div class="flex flex-row items-center justify-between">
        <div class="bg-gray-200 w-20 h-20 rounded-full"></div>
        <div class="w-2/4 flex flex-row justify-between">
          <div class="bg-gray-200 w-12 h-12 rounded"></div>
          <div class="bg-gray-200 w-12 h-12 rounded"></div>
          <div class="bg-gray-200 w-12 h-12 rounded"></div>
        </div>
      </div>
      <div class="py-2.5 space-y-2">
        <div class="h-4 w-1/5 bg-gray-200 rounded mb"></div>
        <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>
    </div>
    <!-- プロフィール -->
    <div v-if="!skeleton" class="user-information">
      <div class="icon-follow flex flex-row items-center justify-between">
        <div class="icon">
          <img :src="userInformation.icon" class="w-20 h-20 rounded-full" />
        </div>
        <div class="follow-information w-2/4 flex flex-row justify-between">
          <div class="posts-number text-center p-1">
            <span class="font-medium">{{ numberOfPost }}</span>
            <br />
            <span class="text-xs">Posts</span>
          </div>
          <button
            type="button"
            class="folower-number text-center p-1"
            @click="jumpFollowFollowerPage(userId, false)"
          >
            <span class="font-medium">{{ numberOfFollower }}</span>
            <br />
            <span class="text-xs">Followers</span>
          </button>
          <button
            type="button"
            class="folow-number text-center p-1"
            @click="jumpFollowFollowerPage(userId, true)"
          >
            <span class="font-medium">{{ numberOfFollow }}</span>
            <br />
            <span class="text-xs">Following</span>
          </button>
        </div>
      </div>
      <div class="bio-contents py-2.5">
        <span class="font-medium">{{ userInformation.userName }}</span>
        <br />
        <span class="text-sm">{{ userInformation.bio }}</span>
      </div>
    </div>
    <!-- followbutton skeleton screen -->
    <div
      v-if="skeleton"
      class="animate-pulse bg-gray-200 w-full h-6 py-1 px-2 border border-gray-300 rounded"
    ></div>
    <!-- フォローボタン -->
    <div v-if="!skeleton">
      <button
        class="text-xs bg-transparent w-full text-black font-semibold py-1 px-2 border border-gray-300 rounded"
        type="button"
        @click="onClickFollowButton()"
      >
        {{ followButton }}
      </button>
    </div>
    <!-- ここまで -->
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
    <!-- ここまで -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '~/components/Post.vue'
import Prefecture from '~/components/Prefecture.vue'

export default Vue.extend({
  components: {
    Post,
    Prefecture,
  },
  middleware: 'auth',
  data() {
    return {
      // 対象ユーザーのid
      userId: -1,
      // 対象ユーザーのユーザー情報
      userInformation: {},
      // 対象ユーザーの投稿一覧
      myPosts: [] as any,
      // フォロー数
      numberOfFollow: 0,
      // フォロワー数
      numberOfFollower: 0,
      // 投稿数
      numberOfPost: 0,
      // 投稿に紐づいた都道府県情報
      postedPrefectures: [] as any,
      //   ログイン中のユーザーid
      myUserId: -1,
      // フォローボタン
      followButton: '',
      // ログイン中のユーザーがフォローしているかを表すフラグ
      isFollowing: true,
      // スケルトンスクリーン
      skeleton: true,
    }
  },
  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },
  async created() {
    // ログイン中のユーザーid
    this.myUserId = this.$store.getters['user/getLoginUserId']
    // パラメーターより対象のuserID取得
    this.userId = parseInt(this.$route.params.id)

    // ログイン中のユーザーが対象ユーザーをフォローしているか判定、初期表示を行う
    const response = await this.$axios.$get(
      `https://api-instagram-app.herokuapp.com/mypage/${this.myUserId}`
    )
    const myFollowLists = response.user.follow
    if (myFollowLists.length === 0) {
      this.isFollowing = false
      this.followButton = 'Follow'
    } else {
      for (const myFollowList of myFollowLists) {
        if (this.userId === myFollowList) {
          this.isFollowing = true
          this.followButton = 'Following'
          break
        } else {
          this.isFollowing = false
          this.followButton = 'Follow'
        }
      }
    }

    this.asyncPost()
  },
  methods: {
    /**
     * ユーザーidを基にAPIからユーザー情報、投稿一覧を取得してdataに格納.
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
      this.skeleton = false
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
    /**
     * フォローボタンが押された際の処理.
     */
    onClickFollowButton() {
      if (this.isFollowing === true) {
        this.isFollowing = false
        this.followButton = 'Follow'
        this.deleteFollow()
      } else if (this.isFollowing === false) {
        this.isFollowing = true
        this.followButton = 'Following'
        this.addFollow()
      }
    },
    /**
     * フォローする.
     */
    async addFollow() {
      await this.$axios.post('https://api-instagram-app.herokuapp.com/follow', {
        userId: this.myUserId,
        targetUserId: this.userId,
      })
      this.asyncPost()
    },
    /**
     * フォローを解除する.
     */
    async deleteFollow() {
      await this.$axios.post(
        'https://api-instagram-app.herokuapp.com/unfollow',
        {
          userId: this.myUserId,
          targetUserId: this.userId,
        }
      )
      this.asyncPost()
    },
    /**
     * フォロー・フォロワー一覧に飛ぶ.
     *
     * @param userId - 現在表示されているプロフィールのユーザーid
     * @param fromFollow - フォローをクリック:true、フォロワーをクリック:false
     */
    jumpFollowFollowerPage(userId: number, fromFollow: boolean) {
      this.$router.push({
        path: '/followFollower/' + userId,
        // 型判定のエラーを消すためString型で渡す
        query: { clickFromFollow: String(fromFollow) },
      })
    },
  },
})
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
