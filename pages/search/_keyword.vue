<template>
  <div>
    <Item 
      v-for="work in works" 
      :key="work.sys.id"
      :work="work"
    />
  </div>
</template>

<script>
import Item from '~/components/Item'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default {
  components: {
    Item
  },
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        // 取得対象をworkタイプに限定
        'content_type': 'work',
        // keywordパラメータをいずれかのフィールドに含む記事データのみを抽出
        query: params.keyword,
        order: '-sys.createdAt'
      }),
    ]).then(([works]) => {
      return {
        // 取得されたデータを配列worksに入れる
        works: works.items
      }
    }).catch(console.error)
  }
}
</script>