import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Switch, notification, Radio, Popover, Modal, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import InputItem from 'src/components/_user/InputItem'
import { createProfile, getProfileList, updateProfile } from 'src/service/profile'

function AdminHome(props) {
  const [curUserInfo, setcurUserInfo] = useState(null)
  const [profile, setprofile] = useState(null)

  const [logo, setlogo] = useState('')
  const [title, settitle] = useState('')
  const [github, setgithub] = useState('')
  const [social_link, setsocial_link] = useState('')
  const [copyright, setcopyright] = useState('')
  const [allowAComment, setallowAComment] = useState(false)
  const [allowBComment, setallowBComment] = useState(false)
  const [showBlog, setshowBlog] = useState(false)
  const [blogName, setblogName] = useState('')

  // 获取资料
  const getProfile = () => {
    getProfileList().then((res) => {
      if (res) {
        setprofile(res)
        setlogo(res.attributes.logo)
        settitle(res.attributes.title)
        setgithub(res.attributes.github)
        setsocial_link(res.attributes.social_link)
        setcopyright(res.attributes.copyright)
        setallowAComment(res.attributes.allowAComment)
        setallowBComment(res.attributes.allowBComment)
        setshowBlog(res.attributes.showBlog)
        setblogName(res.attributes.blogName)
      } else {
        createProfile().then((resCreate) => {
          setprofile(resCreate)
        })
      }
    })
  }

  // 更新profile
  const handlesubmit = async () => {
    await updateProfile({
      profileItem: profile,
      params: {
        logo,
        title,
        github,
        social_link,
        copyright,
        allowAComment,
        allowBComment,
        showBlog,
        blogName,
      },
    })
    getProfile()
    notification.success({
      message: '更新成功',
      // description: "请输入用户名、密码",
    })
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <Layout
      onChange={(params) => {
        setcurUserInfo(params.userinfo)
      }}
    >
      <p className="_admin_body_section_title">基本设置</p>
      {curUserInfo && curUserInfo.toJSON().priority === 100 && profile ? (
        <div className={styles.setting}>
          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <InputItem
              title="Logo"
              type="image"
              value={logo}
              onChange={(e) => {
                setlogo(e)
              }}
            />
            <InputItem
              title="标题"
              placeholder="请输入标题"
              value={title}
              onChange={(e) => {
                settitle(e)
              }}
            />
            <InputItem
              title="Github"
              placeholder="请输入url"
              value={github}
              onChange={(e) => {
                setgithub(e)
              }}
            />
            <InputItem
              title="社交链接"
              placeholder="请输入url"
              value={social_link}
              onChange={(e) => {
                setsocial_link(e)
              }}
            />
            <InputItem
              title="CopyRight"
              placeholder="请输入copyright"
              value={copyright}
              onChange={(e) => {
                setcopyright(e)
              }}
            />
          </div>

          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <InputItem
              type="switch"
              title="允许评论文章"
              value={allowAComment}
              onChange={(e) => {
                setallowAComment(e)
              }}
            />
          </div>
          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <InputItem
              type="switch"
              title={`开放${process.env.blogname}`}
              value={showBlog}
              onChange={(e) => {
                setshowBlog(e)
              }}
            />
            <InputItem
              type="switch"
              title={`允许评论${process.env.blogname}`}
              value={allowBComment}
              onChange={(e) => {
                setallowBComment(e)
              }}
            />
            <InputItem
              title={`${process.env.blogname}名称`}
              placeholder="请输入"
              value={blogName}
              onChange={(e) => {
                setblogName(e)
              }}
            />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              handlesubmit()
            }}
          >
            保存
          </Button>
        </div>
      ) : (
        <div
          className="_admin_body_section_block"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}
        >
          暂无权限，请联系管理员开通～
        </div>
      )}
    </Layout>
  )
}

export default AdminHome
