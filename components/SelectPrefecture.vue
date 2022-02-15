<template>
  <div>
    <div id="chartdiv"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      // mapオブジェクト
      map: {} as any,
      // 選択した都道府県
      selectPrefecture: { id: '', name: '' },
    }
  },
  /**
   * 表示する地図の設定をする.
   */
  mounted(): void {
    const { am4core, am4maps, am4geodataJapanLow } = (this as any).$am4core()

    // Create map instance
    this.map = am4core.create('chartdiv', am4maps.MapChart)
    // Set map definition
    this.map.geodata = am4geodataJapanLow
    // Set projection
    this.map.projection = new am4maps.projections.Miller()
    // Create map polygon series
    const polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true
    if (polygonSeries.tooltip) {
      polygonSeries.tooltip.fill = am4core.color('#000000')
    }

    // 全体の初期設定
    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name}'
    // 都道府県の初期背景色
    polygonTemplate.fill = am4core.color('white')
    // 都道府県の輪郭線色
    polygonTemplate.stroke = am4core.color('gray')

    // hover状態の設定
    const hoverState = polygonTemplate.states.create('hover')
    hoverState.properties.fill = am4core.color('white')

    // active状態の設定
    const activeState = polygonTemplate.states.create('active')
    activeState.properties.fill = am4core.color('#0D9900')

    // 都道府県をクリックしたときのメソッド（active状態）
    polygonSeries.mapPolygons.template.events.on('hit', (ev: any) => {
      // 都道府県をクリックしたらズーム
      // eslint-disable-next-line prefer-const
      let currentActive: any
      if (currentActive) {
        currentActive.setState('default')
      }
      this.map.zoomToMapObject(ev.target)
      currentActive = ev.target

      const data = ev.target.dataItem.dataContext
      // 親子コンポーネントに選択した都道府県を渡す
      this.selectPrefecture = { id: data.id, name: data.name }
      this.$emit('givePrefecture', this.selectPrefecture)
      // active状態の切り替え
      polygonSeries.mapPolygons.each(function (polygon: any) {
        polygon.isActive = false
      })
      ev.target.isActive = true
    })
  },
  /**
   * 地図を表示する.
   */
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
})
</script>
<style scoped>
#chartdiv {
  width: 100%;
  height: 300px;
}
</style>
