import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'
import { BackTop } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import { getArticleById } from 'src/service/article'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function MyComponent() {
  const router = useRouter()
  const aid = router.query.id
  const [profile, setprofile] = useState(null)

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
    <Layout
      onChange={(params) => {
        setprofile(params.profile)
      }}
    >
      <BackTop />
      
    </Layout>
  )
}

export default MyComponent
