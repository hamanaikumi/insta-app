// state
export const state = () => ({
  // 現在ログインしているユーザー
  loginUser: {
    userId: 2,
    userName: 'test_user2',
    password: 'test2222',
    follow: [3, 5],
    follower: [3, 1],
  },

  // 自分のフォローしている人の投稿が格納される
  followingUserPostList: [],

  user: [
    {
      userId: 1,
      userName: 'test_user1',
      password: 'test1111',
      follow: [],
      follower: [],
    },
    {
      userId: 2,
      userName: 'test_user2',
      password: 'test2222',
      follow: [3, 5, 6],
      follower: [3, 5],
    },
    {
      userId: 3,
      userName: 'test_user3',
      password: 'test3333',
      follow: [2, 4],
      follower: [2, 4],
    },
    {
      userId: 4,
      userName: 'test_user4',
      password: 'test4444',
      follow: [1],
      follower: [3, 5],
    },
    {
      userId: 5,
      userName: 'test_user5',
      password: 'test5555',
      follow: [1, 2, 3, 4],
      follower: [1, 2, 3],
    },
  ],

  // 時間はUTC基準
  post: [
    {
      postId: 1,
      userId: 1,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
      ],
      caption: 'たい焼き食べたい',
      prefecture: { 'JP-01': 'Hokkaido' },
      postDate: new Date(2021, 11, 15, 14),
      favorites: ['test_user3', 'test_user5'],
    },
    {
      postId: 2,
      userId: 2,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
      ],
      caption: 'どら焼きどら焼き',
      prefecture: { 'JP-13': 'Tokyo' },
      postDate: new Date(2021, 10, 23, 6),
      favorites: ['test_user1'],
    },
    {
      postId: 3,
      userId: 3,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/0d0e05b2609da1e53ffe85fb85fad3fd',
      ],
      caption: 'testtesttesttesttesttest',
      prefecture: { 'JP-27': 'Osaka' },
      postDate: new Date(2022, 1, 1, 16),
      favorites: ['test_user1', 'test_user5', 'test_user2'],
    },
    {
      postId: 4,
      userId: 2,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
      ],
      caption:
        '吾輩は猫である。名前はまだない。どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪（どうあく）な種族であったそうだ。この書生というのは時々我々を捕（つかま）えて煮て食うという話である。しかしその当時は何という考（かんがえ）もなかったから別段恐しいとも思わなかった。ただ彼の掌（てのひら）に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。',
      prefecture: { 'JP-27': 'Osaka' },
      postDate: new Date(2021, 10, 23, 13),
      favorites: ['test_user1'],
    },
    {
      postId: 5,
      userId: 4,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/0d0e05b2609da1e53ffe85fb85fad3fd',
      ],
      caption: 'imagawayakitabetaiYO',
      prefecture: { 'JP-13': 'Tokyo' },
      postDate: new Date(2021, 7, 2, 21),
      favorites: [],
    },
    {
      postId: 6,
      userId: 1,
      imageUrl: [
        'https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2',
      ],
      caption:
        '吾輩は猫である。名前はまだない。どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪（どうあく）な種族であったそうだ。この書生というのは時々我々を捕（つかま）えて煮て食うという話である。しかしその当時は何という考（かんがえ）もなかったから別段恐しいとも思わなかった。ただ彼の掌（てのひら）に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。',
      prefecture: { 'JP-27': 'Osaka' },
      postDate: new Date(2021, 4, 15, 17),
      favorites: ['test_user2', 'test_user3', 'test_user4', 'test_user5'],
    },
  ],

  comment: [
    {
      commentId: 1,
      postId: 2,
      userId: 1,
      comment: 'testtesttesttesttesttest',
      commentDate: new Date(2021, 10, 23, 10),
    },
    {
      commentId: 2,
      postId: 2,
      userId: 3,
      comment:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      commentDate: new Date(2021, 10, 24, 9),
    },
    {
      commentId: 3,
      postId: 4,
      userId: 5,
      comment: 'testtesttesttesttesttest',
      commentDate: new Date(2021, 10, 23, 14),
    },
    {
      commentId: 4,
      postId: 6,
      userId: 2,
      comment: 'testtesttesttesttesttest',
      commentDate: new Date(),
    },
  ],
})

// actions
export const actions = {}

// mutaions
export const mutations = {
  /**
   * postの中からuseridで投稿を絞り込むんでstate.followingUserPostListにpush
   */
  getPostByFollowingUserId(state: any) {
    for (const id of state.loginUser.follow) {
      state.followingUserPostList.push(
        state.post.filter((aPost: any) => aPost.userId === id)
      )
    }
    console.dir('mutation' + JSON.stringify(state.followingUserPostList))
  },
}

//  Array②.push(
//  for (let  id   of   Array①  ) {
//   PostsArray.filter((post)=> post.userID === id )
//       }
//    )

// getters
export const getters = {
  getUserInformation(state: any) {
    return state.user
  },
  getPostInformation(state: any) {
    return state.post
  },
  getCommentInformation(state: any) {
    return state.comment
  },

  /**
   * 現在ログインしているユーザー情報
   */
  getLoginUser(state: any) {
    return state.loginUser
  },
  /**
   *
   */
  getFollowingUserPostList(state: any) {
    return state.followingUserPostList
  },
}
