<template>
  <div class="container mt-5 box-border p-5">
    <div class="tab-wrap">
      <input
        id="TAB-01"
        type="radio"
        name="TAB"
        class="tab-switch"
        checked="checked"
      />
      <label class="tab-label" for="TAB-01">
        <!--<i class="fas fa-border-all"></i
      >-->
      </label>
      <div class="tab-content">
        <!-- <Post :post-informations="myPosts"></Post> -->
      </div>
      <input id="TAB-02" type="radio" name="TAB" class="tab-switch" />
      <label class="tab-label" for="TAB-02">
        <!-- <i class="fas fa-map-marker-alt"></i> -->
      </label>
      <div class="tab-content">
        <!-- <Prefecture :posted-prefectures="postedPrefectures"></Prefecture> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style></style>
