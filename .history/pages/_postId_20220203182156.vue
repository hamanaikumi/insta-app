<template>
  <main class="main">
    <div class="top-container flex flex-row">
      <div class="icon-container">
        <img
          src="https://hamana-bucket.s3.ap-northeast-1.amazonaws.com/c399eed005340ae33291400f1a88a7e2"
          alt=""
        />
      </div>
      <div>
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
        <div><i class="far fa-comment"></i></div>
      </div>
      <div class="liked-container">
        <span> Liked by 20 !</span>
      </div>
    </div>
    <div class="caption-container">
      <div>_XXXXXXXX</div>
      <div>texttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>
      <div>January 1,2022</div>
    </div>
  </main>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.main {
  max-width: 428px;
  margin: 0 auto;
}

.top-container {
  align-items: center;
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
.user-name {
  font-size: 0.87rem;
  font-weight: 600;
  line-height: 1;
}
.prefecture-name {
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1;
}
</style>
