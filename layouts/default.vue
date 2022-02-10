<template>
  <body class="">
    <header-componet
      v-if="$route.path !== '/Login' && $route.path !== '/Signup'"
      class="fixed top-0 w-full z-10"
    />
    <main>
      <Nuxt class="pt-[56px] z-0" />
    </main>
    <footer-componet
      v-if="$route.path !== '/Login' && $route.path !== '/Signup'"
      class="fixed bottom-0 w-full z-10"
    />
  </body>
</template>
<style scoped>
body {
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
}
</style>
