<template>
  <div class="container mt-5 box-border p-5">
    <div class="tab-wrap">
      <!-- フォロワー -->
      <input
        id="TAB-FOLLOWER"
        type="radio"
        name="TAB"
        class="tab-switch"
        :checked="fromFollower"
      />
      <label class="tab-label text-base" for="TAB-FOLLOWER">
        {{ numberOfFollower }}Followers
      </label>
      <div class="tab-content">
        <Follow
          :follow-user-informations="followerUserInformations"
          :is-follow="false"
          :my-user-id="myUserId"
          :is-my-list="isMyList"
          :skeleton="skeleton"
          @deleteFollowNumber="deleteFollowNumber()"
          @deleteFollowerNumber="deleteFollowerNumber()"
          @addFollowNumber="addFollowNumber()"
        ></Follow>
      </div>
      <!-- ここまで -->
      <!-- フォロー -->
      <input
        id="TAB-FOLLOW"
        type="radio"
        name="TAB"
        class="tab-switch"
        :checked="fromFollow"
      />
      <label class="tab-label text-base" for="TAB-FOLLOW">
        {{ numberOfFollow }}Following
      </label>
      <div class="tab-content">
        <Follow
          :follow-user-informations="followUserInformations"
          :is-follow="true"
          :my-user-id="myUserId"
          :is-my-list="isMyList"
          :skeleton="skeleton"
          @deleteFollowNumber="deleteFollowNumber()"
          @deleteFollowerNumber="deleteFollowerNumber()"
          @addFollowNumber="addFollowNumber()"
        ></Follow>
      </div>
      <!-- ここまで -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Follow from '~/components/Follow.vue'
export default Vue.extend({
  components: {
    Follow,
  },
  middleware: 'auth',
  data() {
    return {
      // フォローユーザー情報一覧
      followUserInformations: [] as any,
      // フォロワー情報一覧
      followerUserInformations: [] as any,
      // フォロー数
      numberOfFollow: undefined as undefined | number,
      // フォロワー数
      numberOfFollower: undefined as undefined | number,
      // ログイン中のユーザーid
      myUserId: -1,
      // 遷移元のユーザーid
      fromUserId: -1,
      // 自分のフォローフォロワーリストか否か
      isMyList: true,
      // 初期表示用フラグ
      // フォローをクリックして遷移:true
      fromFollow: true,
      // フォロワーをクリックして遷移:true
      fromFollower: false,
      // スケルトンスクリーン
      skeleton: true,
    }
  },

  head(): any {
    return {
      title: `${this.$route.name} - Zipangram`,
    }
  },

  created() {
    this.myUserId = this.$store.getters['user/getLoginUserId']
    this.fromUserId = parseInt(this.$route.params.id)
    // 自分のフォローリストか否か判定
    if (this.myUserId !== this.fromUserId) {
      this.isMyList = false
    }
    // フォロー・フォロワーどちらをクリックしたかで初期表示を変える
    if (this.$route.query.clickFromFollow === 'true') {
      this.fromFollow = true
      this.fromFollower = false
    } else if (this.$route.query.clickFromFollow === 'false') {
      this.fromFollow = false
      this.fromFollower = true
    }
    this.asyncPost()
  },

  methods: {
    /**
     * ユーザーidを基にAPIからユーザー情報、投稿一覧を取得してdataに格納.
     */
    async asyncPost() {
      const response = await this.$axios.$get(
        `https://api-instagram-app.herokuapp.com/followinfo/${this.fromUserId}`
      )
      this.followUserInformations = response.follow
      this.followerUserInformations = response.follower
      this.numberOfFollow = response.follow.length
      this.numberOfFollower = response.follower.length
      this.skeleton = false
    },
    /**
     * フォローの表示を1減らす.
     */
    deleteFollowNumber() {
      if (this.numberOfFollow === undefined) {
        console.log('フォロー数が未定義です')
      } else {
        this.numberOfFollow--
      }
    },
    /**
     * フォロワーの表示を1減らす.
     */
    deleteFollowerNumber() {
      if (this.numberOfFollower === undefined) {
        console.log('フォロワー数が未定義です')
      } else {
        this.numberOfFollower--
      }
    },
    /**
     * フォローの表示を1増やす.
     */
    addFollowNumber() {
      if (this.numberOfFollow === undefined) {
        console.log('フォロー数が未定義です')
      } else {
        this.numberOfFollow++
      }
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
