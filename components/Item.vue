<template>
  <div class="w-full my-3 py-2 bg-white overflow-hidden shadow-lg">
    <div 
      class="mb-3 w-full h-64 bg-center bg-cover"
      :style=" 'background-image: url(' + work.fields.image.fields.file.url + ')' "
    ></div>
    <!-- slug名を手がかりに詳細ページに遷移 -->
    <nuxt-link :to=" '/work/' + work.fields.slug">
      <h3 class="ml-3 font-bold">{{ work.fields.title }}</h3>
    </nuxt-link>
    <h4 class="ml-3 my-2 text-xs">{{ work.fields.subtitle }}</h4>
    <div class="flex ml-2">
      <li 
        v-for="tag in work.fields.tag"
        :key="tag.sys.id"
        class="list-none text-xs m-1 bg-gray-200 p-1 rounded cursor-pointer"
      >
        {{ tag.fields.name }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'work'
  ]
}
</script>