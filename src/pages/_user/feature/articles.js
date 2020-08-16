import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { Tree, Button, notification, Input, Modal, Spin } from 'antd'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import NoData from 'src/components/_user/NoData'
import ArticleItem from 'src/components/_user/ArticleItem'
import { createArticle, getArticleList } from 'src/service/article'
import articleStatus from 'src/lib/articleStatus'
import { createMenus, updateMenus, getMenusList } from 'src/service/menu'

function AdminHome() {
  const [createModalShow, setcreateModalShow] = useState(false)
  const [status, setstatus] = useState(1)
  const [isSpin, setisSpin] = useState(false)

  const [title, settitle] = useState('')
  // const [author, setauthor] = useState('')
  const [articleLists, setarticleLists] = useState([])
  const [curUserInfo, setcurUserInfo] = useState(null)
  const [curUser, setcurUser] = useState(null)
  const curUserInfoItem = curUserInfo ? curUserInfo.toJSON() : null

  const handleCreate = async () => {
    if (title) {
      await createArticle({
        title,
        author: curUserInfo,
        user: curUser,
      })
      setcreateModalShow(false)
      // 获取文章列表
      await getList()
    }
  }

  const getList = async () => {
    setisSpin(true)
    // 获取文章列表
    const resList = await getArticleList(
      // Object.assign({ status }, curUserInfoItem && curUserInfoItem.priority === 100 ? {} : { user: AV.User.current() })
      Object.assign({
        status,
        user: AV.User.current(),
      })
    )
    setarticleLists(resList)
    setisSpin(false)
  }

  const handleNavChange = async (params) => {
    setstatus(params.status)
    // // 获取文章列表
    // await getList();
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await getList()
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    // 获取文章列表
    getList()
  }, [status, curUserInfo])

  return (
    <Layout
      onChange={(params) => {
        setcurUserInfo(params.userinfo)
        setcurUser(params.curUser)
      }}
    >
      <p className="_admin_body_section_title">我的文章</p>
      <div className="_admin_body_section_block">
        <div className="_admin_body_section_block_nav">
          {articleStatus.map((obj) => {
            return (
              <span
                className={obj.value === status ? '_admin_body_section_block_nav_item_active' : '_admin_body_section_block_nav_item'}
                key={obj.label}
                onClick={() => {
                  handleNavChange({ status: obj.value })
                }}
              >
                {obj.label}
              </span>
            )
          })}
        </div>
      </div>
      <Spin spinning={isSpin} tip="加载中...">
        <div className={styles.articles}>
          {status === 1 && (
            <div
              className={styles.articles_add}
              onClick={() => {
                setcreateModalShow(true)
              }}
            >
              <div className={styles.articles_add_content}>
                <p className={styles.icon}>+</p>
                <p>新的创作</p>
              </div>
            </div>
          )}
          {articleLists.map((obj) => {
            return (
              <ArticleItem
                key={obj.id}
                item={obj}
                onChange={async () => {
                  await getList()
                }}
              />
            )
          })}
          {articleLists && articleLists.length === 0 && status !== 1 ? <NoData /> : null}
          <Modal
            title="创建文章"
            width={400}
            visible={createModalShow}
            onCancel={() => {
              setcreateModalShow(false)
            }}
            onOk={() => {
              handleCreate()
            }}
            okText="创建"
            cancelText="取消"
          >
            <Input
              style={{ margin: '15px 0' }}
              placeholder="文章标题"
              onChange={(e) => {
                settitle(e.target.value)
              }}
            />
            {/* <Input
              style={{ margin: '15px 0' }}
              placeholder="作者名称"
              onChange={(e) => {
                setauthor(e.target.value)
              }}
            /> */}
          </Modal>
        </div>
      </Spin>
    </Layout>
  )
}

export default AdminHome
