import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styles1 from './index.module.scss'
import styles2 from './index2.module.scss'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

Components.defaultProps = {
  data: null,
}

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)

  useEffect(() => {}, [])
  const type = localStorage.getItem('CMS_ArticleItemType') || 2
  const styles = type == 2 ? styles2 : styles1

  const time = dayjs(props.data.updatedAt).unix() * 1000 > (Date.now() - 1000 * 60 * 60 * 24 * 1) ? dayjs(props.data.updatedAt).fromNow() : dayjs(props.data.updatedAt).format('YYYY/MM/DD')
  return (
    <a target="_blank" href={`/_demo/adetail/${props.data.id}?cate1=${props.data.category_1_key}&cate2=${props.data.category_2_key}`}>
      <div className={styles.articleItem}>
        <div className={styles.articleItem_userinfo}>
          <span className="username">{props.data.author.nickname}</span>
          <span className={styles.time}>・{time}</span>
          <span className={styles.time}>・{`${props.data.category_2_title}`}</span>
        </div>
        <div className={styles.articleItem_content}>
          <div className={styles.poster} style={{ backgroundImage: `url(${props.data.poster})` }}></div>
          <div className={styles.info}>
            <p className={styles.title}>{props.data.title}</p>
            {/* <p className={styles.time}>更新于 {dayjs(props.data.updatedAt).format('YYYY/MM/DD')}</p> */}
          </div>
        </div>
      </div>
    </a>
  )
}

export default Components
