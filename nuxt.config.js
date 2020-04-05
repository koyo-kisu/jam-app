const config = require('./.contentful.json')
const contentful = require('contentful')

const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

export default {
  mode: 'universal',
  
  // 環境変数を設定したファイル(定数config)から引っ張ってきてる
  env: {
   CTF_SPACE_ID: config.CTF_SPACE_ID,
   CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN
   },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  /*
  ** Plugins to load before mounting the App
    plugins配下のfont-awsomeを読み込む
  */
  plugins: [
    { src: '~plugins/font-awesome', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    'nuxt-fontawesome'
  ],

  markdownit: { 
    html: true,
    injected: true,
    linkify: true,
    breaks: false
  },

  // コンポーネントを'fa'として呼び出す
  fontawesome: {
    component: 'fa'
  },

  // Nuxt.jsは、動的なルーティングを無視してレタリングを行う
  // そのため動的なルーティングの静的ファイルを出力する設定
  // Promiseを返す関数を使う
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': 'work'
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        })
      ]).then(([works,categories,tags]) => {
        return [
          // 各オブジェクトにルーティングを登録
          ...works.items.map(work => `work/${work.fields.slug}`),
          ...categories.items.map(category => `category/${category.fields.slug}`),
          ...tags.items.map(tag => `tag/${tag.sys.id}`)
        ]
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
