<template>
  <div class="content-center px-4 py-8">
    <div class="flex justify-center mt-16">
      <!-- logo -->
      <img src="https://svgsilh.com/svg/1594387.svg" alt="" width="200" />
    </div>
    <div class="mt-8 text-xl">
      <div class="bg-gray-50 py-4 px-4 rounded-lg">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create user name</label>
          <br />
          <input
            class="appearance-none bg-gray-50 border-none focus:outline-none py-2 px-3"
            type="text"
          />
        </div>
      </div>
      <div class="bg-gray-50 py-4 px-4 rounded-lg mt-8">
        <div class="border-b border-input-value-color">
          <label class="text-input-value-color">Create a password</label><br />
          <input
            class="appearance-none bg-gray-50 border-none focus:outline-none py-2 px-3"
            type="password"
          />
        </div>
      </div>
    </div>
    <div class="mt-12">
      <!-- button -->
      <button
        class="text-white bg-accent-color focus:ring-4 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
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
