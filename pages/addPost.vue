<template>
  <div class="container mx-auto mt-10">
    <!-- <div class="mx-auto m-32"></div> -->
    <!-- image -->
    <div class="flex justify-center grid grid-cols-6 gap-1 mb-4">
      <div
        class="flex justify-center pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        <div class="space-y-1 text-center">
          <svg
            class="mx-auto h-12 w-24 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex justify-center text-sm text-gray-600">
            <label
              for="file-upload"
              class="cursor-pointer rounded-md font-medium"
            >
              <span class="text-lg">
                Select Image
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
              /></span>
            </label>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        Image
      </div>
    </div>

    <div class="flex grid grid-cols-6 gap-1 mb-4">
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        <div class="space-y-1 text-center">
          <svg
            class="mx-auto h-12 w-24 text-gray-400"
            aria-hidden="true"
            data-icon="location-dot"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 600"
          >
            <path
              d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"
            ></path></svg
          ><!-- <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 30 20"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"
                    stroke-width="1"
                  />
                </svg> -->
          <!-- prefecture -->
          <div class="flex justify-center text-sm text-gray-600">
            <label
              for="file-upload"
              class="cursor-pointer rounded-md font-medium"
            >
              <span class="text-lg">
                Add Prefecture
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
              /></span>
            </label>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 col-span-3"
      >
        Prefecture
      </div>
    </div>

    <div>
      <textarea
        rows="7"
        class="block w-full sm:text-sm border border-gray-300 rounded-md"
        placeholder="Write a caption..."
      />
    </div>
    <!-- button -->
    <div class="px-4 py-3 text-center mt-8">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl"
      >
        Canncel
      </button>
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 text-xl"
      >
        Share
      </button>
    </div>
  </div>
</template>
<style scoped>
.location-dot {
  color: gray;
}
</style>
