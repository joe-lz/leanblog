import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import { getArticleById } from 'src/service/article'

var md = new Remarkable({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {}

    return '' // use external default escaping
  },
})
function MyComponent() {
  const router = useRouter()
  const aid = router.query.id
  const [articleObj, setarticleObj] = useState('')

  useEffect(() => {
    async function fetchData() {
      if (aid) {
        const res = await getArticleById({ id: aid })
        setarticleObj(res)
      }
    }
    fetchData()
  }, [router])

  return (
    <Layout>
      {/* 文章列表 */}
      {articleObj && (
        <div className={styles.container}>
          <p className={styles.title}>{articleObj.attributes.title}</p>
          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: md.render(articleObj.attributes.articleVal),
            }}
          ></article>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
