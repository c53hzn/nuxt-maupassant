var myBase = "/nuxt-maupassant";


module.exports = {
  head: {
    // eg: 'Home | Jenny的小站',
    titleTemplate: '%s | Jenny的小站',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: myBase+'/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: myBase+'/favicon.ico' },
      { rel: 'stylesheet', href: myBase+'/css/font-Noto-Sans-SC.css' },
      { rel: 'stylesheet', href: myBase+'/css/style.css?2022-01-30-2' },
      { rel: 'stylesheet', href: myBase+'/font-awesome/css/font-awesome.min.css'},
    ],
    script: [
      { src: '/js/statcounter.js?2021-12-01'},
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-2790001673900763',
        'async':true
      }
    ]
  },
  //if you will deploy in <username>.github.io/<my-project>
  //then base should be set to "/<my-project>/"
  router: {
    base: '/nuxt-maupassant/'
  },
  modules: [
  '@nuxt/content',
  '@nuxtjs/feed'
  ],
  content: {
    // $content api will be served on localhost:3000/content-api
    apiPrefix: 'content-api',
    markdown: {
      prism: {//need to create folder and import manually
        theme: 'prism-themes/themes/prism-ghcolors.css'
      }
    }
  },
  feed() {
    const baseUrlArticles = 'https://www.houzhenni.com/nuxt-maupassant/blog';
    const baseLinkFeedArticles = '/blog';
    const feedFormats = {
      rss: { type: 'rss2', file: 'feed.xml' },
    }
    const { $content } = require('@nuxt/content');
    const createFeedArticles = async function (feed) {
      feed.options = {
        title: 'My Blog',
        description: 'I write about technology',
        link: baseUrlArticles,
      }
      const articles = await $content('blog')
      .sortBy('date','desc')
      .only(['date','title','slug','description'])
      .fetch();
      articles.forEach((article) => {
        const url = `${baseUrlArticles}/${article.slug}`;
        feed.addItem({
          title: article.title,
          id: url,
          link: url,
          date: article.published,
          description: article.description,
        })
      })
    }
    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${baseLinkFeedArticles}/${file}`,
      type: type,
      create: createFeedArticles,
    }))
  },
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bus'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
  },
  generate: {
  	async routes () {
      const { $content } = require('@nuxt/content');
      const blogs = await $content('blog')
      .sortBy("date")
      .only(['slug','categories','tags'])
      .fetch();

      var obj = {};
      blogs.map(function(a) {
        a['tags'].map(function(tag) {
          obj['/blog/tag/'+tag] = true;
        });
      	a['categories'].map(function(cat) {
          obj['/blog/category/'+cat] = true;
        });	        
      });

      var arr = [];
      blogs.map(function(a) {
        arr.push("/blog/"+a.slug);
      });

      arr = [...arr,...Object.keys(obj)];
      return arr;
    },
    subFolders: false,
  },
  render: {
    fallback: {
      static: {
        handlers: {
          '.js': false,
          '.css': false
        }
      }
    }
  }
}
