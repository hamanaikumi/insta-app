module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: [
        'Avenir',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Hiragino Sans',
        'ヒラギノ角ゴシック',
        'メイリオ',
        'Meiryo',
        'YuGothic',
        'Yu Gothic',
        'MS PGothic',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        // 'カラー名': 'カラーコード'
        'light-gray': '#B3B3B3',
        'input-value-color': '#8A8A8A',
        'dark-gray': '#626262',
        black: '#000000',
        white: '#FFFFFF',
        'warning-color': '#DC143C',
        'accent-color': '#0D9900',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
