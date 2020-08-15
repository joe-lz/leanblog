import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import marked from 'marked'
import hljs from 'highlight.js'
import { BackTop, message } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import Comments from 'src/components/_demo/Comments'
import CategoryList from 'src/components/_demo/CategoryList'
import Ad from 'src/components/_demo/Ad'
import UserInfo from 'src/components/_demo/UserInfo'
import { getArticleById, updateArticle } from 'src/service/article'
import { createCollect, deleteCollect, countCollect, getMyCollect } from 'src/service/collect'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const nav = []
const renderer = new marked.Renderer()
renderer.heading = function heading(text, level, raw, slugger) {
  nav.push({
    text,
    level,
    raw,
    slugger,
    id: this.options.headerPrefix + slugger.slug(raw) + '-1',
  })
  if (this.options.headerIds) {
    return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n'
  } // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n'
}

marked.setOptions({
  renderer,
  highlight: function (code, language) {
    const hljs = require('highlight.js')
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})
function MyComponent() {
  const router = useRouter()
  const aid = router.query.id
  const [articleObj, setarticleObj] = useState(null)
  const [articleObjJSON, setarticleObjJSON] = useState(null)
  const [author, setauthor] = useState(null)
  const [profile, setprofile] = useState(null)
  const [userinfo, setuserinfo] = useState(null)
  const [html, sethtml] = useState(null)
  const [views, setviews] = useState(0)
  const [collects, setcollects] = useState(0)
  const [myCollect, setmyCollect] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (aid) {
        const res = await getArticleById({ id: aid })
        setarticleObj(res)
        setarticleObjJSON(res.toJSON())
        setauthor(res.attributes.author)
        sethtml(marked(res.attributes.articleVal))
        // 访问数+1
        await updateArticle({
          articleItem: res,
          params: { views: 1 },
        })
        // 收藏数量
        setcollects(await countCollect({ article: res }))
        setviews(res.attributes.views)

        // 我是否收藏
        setmyCollect(await getMyCollect({ article: res }))
      }
    }
    fetchData()
  }, [router])

  const handleCollect = async () => {
    if (myCollect) {
      await deleteCollect({ collect: myCollect })
      setcollects(await countCollect({ article: articleObj }))
      setmyCollect(await getMyCollect({ article: articleObj }))
      message.success('取消收藏')
    } else {
      await createCollect({ article: articleObj })
      setcollects(await countCollect({ article: articleObj }))
      setmyCollect(await getMyCollect({ article: articleObj }))
      message.success('收藏成功')
    }
  }

  return (
    <Layout
      onChange={(params) => {
        setprofile(params.profile)
        setuserinfo(params.userinfo)
      }}
    >
      <BackTop />
      {/* 文章列表 */}
      {articleObj && articleObjJSON && (
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.left_content}>
              <UserInfo userinfo={author} time={dayjs(articleObj.createdAt).format('YYYY/MM/DD')} views={views} />
              <p className={styles.title}>{articleObjJSON.title}</p>
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              ></article>
              <div className={styles.actions}>
                <div className={styles.actions_item}>
                  <i className="iconfont icon-tubiaozhizuo-"></i>
                  {articleObjJSON.likes && <span className={styles.number}>{articleObjJSON.likes || 0}</span>}
                </div>
                <div className={styles.actions_item}>
                  <i className="iconfont icon-tubiaozhizuo--copy"></i>
                  {articleObjJSON.dislikes && <span className={styles.number}>{articleObjJSON.dislikes || 0}</span>}
                </div>
                <div className={myCollect ? styles.actions_item_active : styles.actions_item} onClick={handleCollect}>
                  <i className="iconfont icon-star"></i>
                  {collects ? <span className={styles.number}>{collects || 0}</span> : ''}
                </div>
                <div className={styles.actions_item}>
                  <i className="iconfont icon-message_three_points"></i>
                  {articleObjJSON.comments && <span className={styles.number}>{articleObjJSON.comments || 0}</span>}
                </div>
              </div>
            </div>
            <div className={styles.left_content}>
              <Comments type="article" id={articleObj} userinfo={userinfo} />
            </div>
          </div>
          <div className={styles.right}>
            {/* {author && (
              <div className={styles.author}>
                <div className={styles.author_title}>关于作者</div>
                <div className={styles.author_content}>
                  <UserInfo userinfo={userinfo} />
                </div>
              </div>
            )} */}
            {profile && profile.ads && <Ad item={profile.ads[2]} />}
            <CategoryList nav={nav} />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
