/*
  Source: https://github.com/forsigner/hexo-search/blob/master/index.js
  License: MIT License
  Modify: songhn for hexo-theme-kaze
*/

/* global hexo */
'use strict'
// eslint-disable-next-line camelcase
const url_for = require('hexo-util').url_for.bind(hexo)
hexo.extend.generator.register('_hexo_generator_search', function (locals) {
  const config = hexo.theme.config

  if (!config.search || !config.search.enable || !config.search.path) {
    return
  }

  const searchSource = config.search.field.trim()
  const posts = locals.posts.sort('-date')
  const pages = locals.pages
  let sources = []
  if (searchSource != '' && searchSource != 'all') {
    if (searchSource == 'posts') {
      sources = posts.data
    } else if (searchSource == 'pages') {
      sources = pages.data
    }
  } else {
    sources = posts.data.concat(pages.data)
  }
  let data = []
  sources.forEach((post) => {
    let categories = []
    let tags = []
    if (post.layout == 'post') {
      if (post.categories !== 'undefined') {
        post.categories.data.forEach(function (categorie) {
          categories.push(categorie.name)
        })
      }
      if (post.tags !== 'undefined') {
        post.tags.data.forEach(function (tag) {
          tags.push(tag.name)
        })
      }
    }
    data.push({
      title: post.title,
      url: url_for(`${post.path}`),
      content: config.search.searchContent
        ? post.content.replace(/<[^<>]+>/g, '')
        : '',
      categories: categories,
      tags: tags,
    })
  })
  return {
    path: '/search.json',
    data: JSON.stringify(data),
  }
})
