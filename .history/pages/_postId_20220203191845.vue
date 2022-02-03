<template>
  <main>
    <div class="main">
      <div class="top-container flex flex-row">
        <div class="icon-container">
          <img
            src="https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2"
            alt=""
          />
        </div>
        <div class="top-item-container">
          <div class="user-name">_XXXXX</div>
          <div class="prefecture-name">Tokyo</div>
        </div>
      </div>
      <div class="img-container">
        <img
          src="https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2"
          alt=""
        />
      </div>
      <div class="activity-container">
        <div class="flex flex-row">
          <div><i class="far fa-heart"></i></div>
          <div class="ml-1"><i class="far fa-comment"></i></div>
        </div>
        <div class="liked-container">
          <span> Liked by 20 !</span>
        </div>
      </div>
      <div class="caption-container">
        <div>_XXXXXXXX</div>
        <div>texttexttexttexttext</div>
        <div>January 1,2022</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
main {
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  font-size: 62.5%;
}

.top-container {
  max-width: 100%;
  padding: 0.63rem;
  align-items: center;
  box-sizing: border-box;
}

.icon-container {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.icon-container img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.top-item-container {
  margin-left: 1rem;
}
.user-name {
  font-size: 0.87rem;
  font-weight: 500;
  line-height: 1;
}
.prefecture-name {
  font-size: 0.75rem;
  font-weight: 300;
}

.img-container {
  width: 100%;
  max-height: 17.5rem;
  text-align: center;
}
.img-container img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.caption-container {
  max-width: 100%;
  width: 100%;
}

.activity-container {
  padding: 0.67rem;
}
</style>
