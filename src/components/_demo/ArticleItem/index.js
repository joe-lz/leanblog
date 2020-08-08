import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styles1 from './index.module.scss'
import styles2 from './index2.module.scss'

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)

  useEffect(() => {}, [])
  const type = localStorage.getItem('CMS_ArticleItemType') || 2
  const styles = type == 2 ? styles2 : styles1
  return (
    <a
      target="_blank"
      href={`/_demo/adetail/${props.data.id}?cate1=${props.data.attributes.category_1_key}&cate2=${props.data.attributes.category_2_key}`}
    >
      <div className={styles.articleItem}>
        <div className={styles.poster} style={{ backgroundImage: `url(${props.data.attributes.poster})` }}></div>
        <div className={styles.bottom}>
          <p className={styles.title}>{props.data.attributes.title}</p>
          <p className={styles.time}>更新于 {dayjs(props.data.attributes.updatedAt).format('YYYY/MM/DD')}</p>
        </div>
      </div>
    </a>
  )
}

export default Components
