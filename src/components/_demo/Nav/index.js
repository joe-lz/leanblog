import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Menu, Dropdown } from 'antd'

import styles from './index.module.scss'

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)

  useEffect(() => {}, [])
  const router = useRouter()

  let curNav = null
  props.menus.map((obj) => {
    if (router.query.cate1 === obj.key) {
      curNav = obj
    }
    return obj
  })

  const curUser = AV.User.current()
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/_user/home">
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Head>
        {props.profile && (
          <title>
            {props.profile.title || '鲸典设计'}
            {curNav ? `-${curNav.title}` : ''}
            {router.pathname.includes('_demo/home') ? '-首页' : ''}
            {router.pathname.includes('_demo/posts') ? `-${props.profile.blogName}` : ''}
          </title>
        )}
      </Head>
      {/* 一级目录 */}
      <div className={styles.nav1}>
        <div className={styles.nav}>
          <div className={styles.nav_logo} style={{ backgroundImage: `url(${props.profile.logo})` }}></div>
          <div className={styles.nav_link}>
            <Link href="/_demo/home">
              <div className={router.pathname.includes('_demo/home') ? styles.nav_link_item_active : styles.nav_link_item}>首页</div>
            </Link>
            {props.menus.map((obj) => {
              let toLink = `/_demo/alist?cate1=${obj.key}`
              // if (obj.children && obj.children.length > 0) {
              //   toLink = `/_demo/alist?cate1=${obj.key}&cate2=${obj.children[0].key}`
              // }
              return (
                <Link href={toLink} key={obj.key}>
                  <div className={router.query.cate1 === obj.key ? styles.nav_link_item_active : styles.nav_link_item} key={obj.key}>
                    {obj.title}
                  </div>
                </Link>
              )
            })}
            {props.profile.showBlog && (
              <Link href="/_demo/posts">
                <div className={router.pathname.includes('_demo/posts') ? styles.nav_link_item_active : styles.nav_link_item}>
                  {props.profile.blogName}
                </div>
              </Link>
            )}
          </div>
          {curUser ? (
            <Dropdown overlay={menu}>
              <div className={styles.link_login} onClick={(e) => e.preventDefault()}>
                <div className={styles.btn}>
                  <span>{curUser.attributes.username}</span>
                  <i className="iconfont icon-down" style={{ fontSize: 12 }}></i>
                </div>
              </div>
            </Dropdown>
          ) : (
            <Link href="/_user/home">
              <p className={styles.nav_login}>登录/注册</p>
            </Link>
          )}
        </div>
      </div>
      {/* 二级目录 */}
      {curNav && curNav.children && (
        <div className={styles.nav2}>
          <div className={styles.nav_link}>
            <Link href={`/_demo/alist?cate1=${curNav.key}`}>
              <div className={!router.query.cate2 ? styles.nav_link_item_active : styles.nav_link_item}>全部</div>
            </Link>
            {curNav.children.map((obj) => {
              return (
                <Link href={`/_demo/alist?cate1=${curNav.key}&cate2=${obj.key}`} key={obj.key}>
                  <div className={router.query.cate2 === obj.key ? styles.nav_link_item_active : styles.nav_link_item} key={obj.key}>
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
