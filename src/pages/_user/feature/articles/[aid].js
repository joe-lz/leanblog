import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { Tree, Button, notification, Input, Modal, TreeSelect } from 'antd'
import { useRouter } from 'next/router'
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'
import { getArticleById, updateArticle } from 'src/service/article'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import { getMenusList } from 'src/service/menu'

const { TextArea } = Input

// const md = new Remarkable();
var md = new Remarkable({
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
function AdminHome() {
  const router = useRouter()
  const { aid } = router.query

  const [articleItem, setarticleItem] = useState(null)
  const [menus, setmenus] = useState([])

  const [category_1_key, setcategory_1_key] = useState(null)
  const [category_1_title, setcategory_1_title] = useState(null)
  const [category_2_key, setcategory_2_key] = useState(null)
  const [category_2_title, setcategory_2_title] = useState(null)
  const [articleTitle, setarticleTitle] = useState('')
  const [articleVal, setarticleVal] = useState(`# Remarkable
> Experience real-time editing with Remarkable!

***

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`)

  const handleGetMenu = async () => {
    // 获取菜单
    const res = await getMenusList()
    setmenus(res.attributes.value)
  }

  const onCategoryChange = (selectKey) => {
    let category_1_key = null
    let category_1_title = null

    let category_2_key = null
    let category_2_title = null

    menus.map((obj1) => {
      if (obj1.key === selectKey) {
        category_1_key = obj1.key
        category_1_title = obj1.title
      }

      if (obj1.children) {
        obj1.children.map((obj2) => {
          if (obj2.key === selectKey) {
            category_1_key = obj1.key
            category_1_title = obj1.title

            category_2_key = obj2.key
            category_2_title = obj2.title
          }
          return obj2
        })
      }
      return obj1
    })
    setcategory_1_key(category_1_key)
    setcategory_1_title(category_1_title)
    setcategory_2_key(category_2_key)
    setcategory_2_title(category_2_title)
  }

  const handleUpdate = async (params = {}) => {
    await updateArticle({
      articleItem,
      params: {
        articleVal,
        title: articleTitle,
        category_1_key,
        category_1_title,
        category_2_key,
        category_2_title,
        ...params
      },
    })
    notification.success({
      message: '保存成功',
      // description: "请输入用户名、密码",
    })
  }

  useEffect(() => {
    handleGetMenu()
  }, [])

  useEffect(() => {
    if (router && router.query) {
      if (aid) {
        async function fetchData() {
          // 获取文章
          const res = await getArticleById({ id: aid })
          console.log(res)
          setcategory_1_key(res.attributes.category_1_key)
          setcategory_1_title(res.attributes.category_1_title)
          setcategory_2_key(res.attributes.category_2_key)
          setcategory_2_title(res.attributes.category_2_title)
          try {
            setarticleItem(res)
            setarticleTitle(res.attributes.title)
          } catch (error) {
            console.log(error)
          }
          if (res.attributes.articleVal) {
            setarticleVal(res.attributes.articleVal)
          }
        }
        fetchData()
      }
    }
  }, [router])

  return (
    <Layout hideSidebar>
      {articleItem && (
        <div className={styles.articles_detail}>
          <div className={styles.articles_detail_title}>
            <div className={styles.articles_detail_title_body}>
              <p className={styles.articles_detail_title_label}>标题：</p>
              <input
                className={styles.articles_detail_title_input}
                placeholder="请输入文章标题"
                value={articleTitle}
                onChange={(e) => {
                  setarticleTitle(e.target.value)
                }}
              />
              <div className={styles.articles_detail_operation}>
                <div className={styles.articles_detail_operation_btn}>
                  <TreeSelect
                    style={{ width: '100%' }}
                    value={category_2_key || category_1_key}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={menus}
                    placeholder="请选择分类"
                    treeDefaultExpandAll
                    onChange={(catgory_key) => {
                      onCategoryChange(catgory_key)
                    }}
                  />
                </div>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  onClick={async () => {
                    await handleUpdate()
                  }}
                >
                  保存
                </Button>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  danger
                  onClick={async () => {
                    await handleUpdate({ status: 3 })
                  }}
                >
                  保存并上线
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.articles_detail_body}>
            <div className={styles.articles_detail_left}>
              <TextArea
                autoSize
                className={styles.articles_detail_left_editor}
                value={articleVal}
                onChange={(e) => {
                  setarticleVal(e.target.value)
                }}
              />
            </div>
            <div className={styles.articles_detail_right}>
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: md.render(articleVal),
                }}
              ></article>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default AdminHome
