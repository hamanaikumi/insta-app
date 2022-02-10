<template>
  <div class="grid content-center px-4 py-8">
    <div class="flex justify-center mt-16">
      <!-- logo -->
      <img src="https://svgsilh.com/svg/1594387.svg" alt="" width="200" />
    </div>
    <div class="mt-8">
      <div class="bg-light-gray pb-2 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-xs text-input-value-color">Create user name</label>
          <br />
          <input
            class="appearance-none bg-transparent border-none focus:outline-none py-2 px-3"
            type="text"
          />
        </div>
      </div>
      <div class="bg-light-gray pb-2 px-4 rounded-lg mt-8">
        <div class="border-b border-input-value-color">
          <label class="text-xs text-input-value-color">Create a password</label
          ><br />
          <input
            class="appearance-none bg-transparent border-none focus:outline-none py-2 px-3"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="grid-cols-8">
      <!-- button -->
      <button
        class="text-white bg-accent-color focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-8"
      >
        Create New Account
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
<style>
main {
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
}
</style>
