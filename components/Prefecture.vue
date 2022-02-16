<template>
  <div>
    <div id="chartdiv"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    postedPrefectures: {
      // eslint-disable-next-line no-array-constructor
      type: Array<any>(),
      required: true,
    },
  },
  data() {
    return {
      // mapオブジェクト
      map: {} as any,
      // 色付け用の都道府県配列
      toColorPrefectures: [] as { id: any; name: any; fill: any }[],
    }
  },
  watch: {
    postedPrefectures() {
      this.setMap()
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.setMap()
    })
  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },

  methods: {
    /**
     * 投稿された都道府県のマップを表示.
     */
    setMap() {
      // プラグインから必要な情報を取得
      const { am4core, am4maps, am4geodataJapanLow } = (this as any).$am4core()

      // 親から渡された都道府県を基に色付け用の配列を作成
      this.toColorPrefectures = []
      for (const postedPrefecture of this.postedPrefectures as any) {
        this.toColorPrefectures.push({
          id: postedPrefecture.id,
          name: postedPrefecture.name,
          fill: am4core.color('#0D9900'),
        })
      }

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

      // 初期設定
      const polygonTemplate = polygonSeries.mapPolygons.template
      polygonTemplate.tooltipText = '{name}'
      // 地図背景色のデフォルト設定
      polygonTemplate.fill = am4core.color('#d3d3d3')

      // // Create hover state and set alternative fill color
      // const hs = polygonTemplate.states.create('hover')
      // hs.properties.fill = am4core.color('#367B25')

      // Add some data
      polygonSeries.data = this.toColorPrefectures

      // Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = 'fill'
    },
  },
})
</script>
<style scoped>
#chartdiv {
  width: 100%;
  height: 600px;
}
</style>
