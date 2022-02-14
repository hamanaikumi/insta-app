<template>
  <section>
    <div id="overlay">
      <div id="content">
        <PostDetail class="post-modal" :givePostId="getPostId"></PostDetail>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
