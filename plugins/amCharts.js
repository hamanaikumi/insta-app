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
