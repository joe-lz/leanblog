import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)

  useEffect(() => {}, [])
  const router = useRouter()

  let curNav = null
  props.menus.map((obj) => {
    if (router.query.id === obj.key) {
      curNav = obj
    }
    return obj
  })

  console.log(router)
  return (
    <div>
      <div className={styles.nav1}>
        <div className={styles.nav}>
          <div className={styles.nav_logo} style={{ backgroundImage: `url(${props.profile.logo})` }}></div>
          <div className={styles.nav_link}>
            <Link href="/_demo/home">
              <div className={router.pathname.includes('_demo/home') ? styles.nav_link_item_active : styles.nav_link_item}>首页</div>
            </Link>
            {props.menus.map((obj) => {
              let toLink = `/_demo/nav/${obj.key}`
              if (obj.children && obj.children.length > 0) {
                toLink = `/_demo/nav/${obj.key}?subid=${obj.children[0].key}`
              }

              return (
                <Link href={toLink} key={obj.key}>
                  <div className={router.query.id === obj.key ? styles.nav_link_item_active : styles.nav_link_item} key={obj.key}>
                    {obj.title}
                  </div>
                </Link>
              )
            })}
          </div>
          <Link href="/_user/home">
            <p className={styles.nav_login}>登录</p>
          </Link>
        </div>
      </div>
      {curNav && curNav.children && (
        <div className={styles.nav2}>
          <div className={styles.nav_link}>
            {curNav.children.map((obj) => {
              return (
                <Link href={`/_demo/nav/${curNav.key}?subid=${obj.key}`} key={obj.key}>
                  <div className={router.query.subid === obj.key ? styles.nav_link_item_active : styles.nav_link_item} key={obj.key}>
                    {obj.title}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Components
