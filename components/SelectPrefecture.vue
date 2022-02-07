<template>
  <div>
    <div id="chartdiv"></div>
    <div id="info"></div>
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
      selectPrefecture: '',
    }
  },
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

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name}'
    // 都道府県の初期背景色
    polygonTemplate.fill = am4core.color('white')
    // 都道府県の輪郭線色
    polygonTemplate.stroke = am4core.color('black')

    // Configure "hover" state
    const hoverState = polygonTemplate.states.create('hover')
    hoverState.properties.fill = am4core.color('white')

    // Configure "active" state
    const activeState = polygonTemplate.states.create('active')
    activeState.properties.fill = am4core.color('#68d391')

    // Set events to apply "active" state to clicked polygons
    polygonSeries.mapPolygons.template.events.on('hit', (ev: any) => {
      // if we have some country selected,zoom
      // eslint-disable-next-line prefer-const
      let currentActive: any
      if (currentActive) {
        currentActive.setState('default')
      }
      this.map.zoomToMapObject(ev.target)
      currentActive = ev.target

      const data = ev.target.dataItem.dataContext
      // 親に選択した都道府県を渡す
      this.selectPrefecture = data.name
      console.log(this.selectPrefecture)
      this.$emit('givePrefecture', this.selectPrefecture)

      polygonSeries.mapPolygons.each(function (polygon: any) {
        polygon.isActive = false
      })
      ev.target.isActive = true
    })
  },
  /**
   * mapを表示する.
   */
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
})
</script>
<style></style>
