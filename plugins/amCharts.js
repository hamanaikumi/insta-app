import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
// 詳細な日本地図
import am4geodataJapanLow from '@amcharts/amcharts4-geodata/japanLow'

import Vue from 'vue'
Vue.prototype.$am4core = () => {
  return {
    am4core,
    am4maps,
    am4geodataJapanLow,
  }
}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default ({ app }, inject) => {
//   // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
//   inject('test', () => {
//     return {
//       am4core,
//       am4maps,
//       am4geodataJapanLow,
//     }
//   })
// }

// Vue.use(am4core, am4maps, am4geodataJapanLow)
