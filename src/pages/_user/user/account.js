import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Button, notification } from 'antd'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import InputItem from 'src/components/_user/InputItem'
import { getMyUserInfo, updateUserInfo } from 'src/service/user'

function AdminHome() {
  const [userinfoObj, setuserinfoObj] = useState(0)

  const [nickname, setnickname] = useState('')
  const [avatar, setavatar] = useState('')
  const [desc, setdesc] = useState('')
  const [github, setgithub] = useState('')
  const [social_link, setsocial_link] = useState('')
  const [co_name, setco_name] = useState('')
  const [position, setposition] = useState('')

  // 更新
  const handlesubmit = async () => {
    await updateUserInfo({
      userinfoItem: userinfoObj,
      params: {
        nickname,
        avatar,
        desc,
        github,
        social_link,
        co_name,
        position,
      },
    })
    getData()
    notification.success({
      message: '更新成功',
      // description: "请输入用户名、密码",
    })
  }

  const getData = async () => {
    const res = await getMyUserInfo()
    setuserinfoObj(res)
    setnickname(res.attributes.nickname)
    setavatar(res.attributes.avatar)
    setdesc(res.attributes.desc)
    setgithub(res.attributes.github)
    setsocial_link(res.attributes.social_link)
    setco_name(res.attributes.co_name)
    setposition(res.attributes.position)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      <div className="_admin_body_section_block" style={{ padding: 30 }}>
        <div className={styles.user}>
          <InputItem
            title="昵称"
            placeholder="请输入昵称"
            value={nickname}
            onChange={(e) => {
              setnickname(e)
            }}
          />
          <InputItem
            title="头像"
            type="image"
            placeholder="请输入昵称"
            value={avatar}
            onChange={(e) => {
              setavatar(e)
            }}
          />
          <InputItem
            title="公司名称"
            placeholder="请输入公司名称"
            value={co_name}
            onChange={(e) => {
              setco_name(e)
            }}
          />
          <InputItem
            title="职业"
            placeholder="请输入职业"
            value={position}
            onChange={(e) => {
              setposition(e)
            }}
          />
          <InputItem
            title="简介"
            placeholder="请输入简介"
            value={desc}
            onChange={(e) => {
              setdesc(e)
            }}
          />
          <InputItem
            title="社交账号"
            placeholder="请输入社交账号"
            value={social_link}
            onChange={(e) => {
              setsocial_link(e)
            }}
          />
          <InputItem
            title="Github"
            placeholder="请输入Github"
            value={github}
            onChange={(e) => {
              setgithub(e)
            }}
          />
        </div>
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
    </Layout>
  )
}

export default AdminHome
