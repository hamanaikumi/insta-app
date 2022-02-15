<template>
  <body class="">
    <main>
      <header-componet
        v-if="$route.path !== '/' && $route.path !== '/Signup'"
        class="fixed top-0 w-full z-10 max-w-[428px]"
      />
      <Nuxt class="pt-[56px] z-0 md-10" />
      <footer-componet
        v-if="$route.path !== '/' && $route.path !== '/Signup'"
        class="fixed bottom-0 w-full z-10 max-w-[428px]"
      />
    </main>
  </body>
</template>
<style scoped>
body {
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
}
</style>
