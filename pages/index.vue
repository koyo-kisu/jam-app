<template>
  <div>
    <div 
      v-for="work in works"
      :key="work.sys.id"
      class="w-full m-2 pb-3 bg-white overflow-hidden shadow-lg"
    >
      <div class="absolute bg-white py-1 px-3 rounded shadow mt-1 ml-1 text-sm">
        {{ work.fields.category.fields.name }}
      </div>
      <div 
        class="mb-3 w-full h-64 bg-center bg-cover"
        :style=" 'background-image: url(' + work.fields.image.fields.file.url + ')' "
      ></div>
      <h3 class="ml-3 font-bold">{{ work.fields.title }}</h3>
      <h4 class="ml-3 my-2 text-xs">{{ work.fields.subtitle }}</h4>
      <div class="flex ml-2">
        <li 
          v-for="tag in work.fields.tag"
          :key="tag.sys.id"
          class="list-none text-xs m-1 bg-gray-200 p-1 rounded"
        >
          {{ tag.fields.name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default { 
  asyncData() {
    return Promise.all([
      client.getEntries({
        'content_type': 'work', // workタイプの記事データを全取得
        order: '-sys.createdAt' // 作成日時順に並べる
      })
    ]).then(([works]) => {
      return {
        works: works.items // 取得したデータを配列worksに入れる
      }
    }).catch(console.error)
  }
}
</script>