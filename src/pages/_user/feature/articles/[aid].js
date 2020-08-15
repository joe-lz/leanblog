import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { Tree, Button, notification, Input, Modal, TreeSelect } from 'antd'
import { useRouter } from 'next/router'
import marked from 'marked'
import hljs from 'highlight.js'

let CodeMirror = null
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  const { UnControlled } = require('react-codemirror2')
  CodeMirror = UnControlled
  require('codemirror/mode/javascript/javascript')
  // require('codemirror/mode/markdown/markdown')
}

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import { getMenusList } from 'src/service/menu'
import { getArticleById, updateArticle } from 'src/service/article'

const { TextArea } = Input
const renderer = new marked.Renderer()
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
  const [articleVal, setarticleVal] = useState(`
Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/
`)

  const handleGetMenu = async () => {
    // 获取菜单
    const res = await getMenusList()
    setmenus(res.toJSON().value)
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
        ...params,
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
          const articleItem = res.toJSON()
          setcategory_1_key(articleItem.category_1_key)
          setcategory_1_title(articleItem.category_1_title)
          setcategory_2_key(articleItem.category_2_key)
          setcategory_2_title(articleItem.category_2_title)
          try {
            setarticleItem(res)
            setarticleTitle(articleItem.title)
          } catch (error) {
            console.log(error)
          }
          if (articleItem.articleVal) {
            setarticleVal(articleItem.articleVal)
          }
        }
        fetchData()
      }
    }
  }, [router])

  return (
    <Layout hideSidebar bodyStyle={{ paddingBottom: 0 }}>
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
              {/* <TextArea
                autoSize
                className={styles.articles_detail_left_editor}
                value={articleVal}
                onChange={(e) => {
                  setarticleVal(e.target.value)
                }}
              /> */}
              {CodeMirror && (
                <CodeMirror
                  value={articleVal}
                  options={{
                    mode: 'javascript',
                    theme: 'github-light',
                    lineNumbers: true,
                  }}
                  onChange={(editor, data, value) => {
                    setarticleVal(value)
                  }}
                />
              )}
            </div>
            <div className={styles.articles_detail_right}>
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: marked(articleVal),
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
