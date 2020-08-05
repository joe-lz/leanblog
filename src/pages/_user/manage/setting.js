import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Switch, notification, Radio, Popover, Modal, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import Upload from 'src/components/_user/Upload'
import { createProfile, getProfileList, updateProfile } from 'src/service/profile'

function AdminHome(props) {
  const [curUserInfo, setcurUserInfo] = useState(null)
  const [modalShow, setmodalShow] = useState(null)
  const [profile, setprofile] = useState(null)

  const [title, settitle] = useState('')
  const [github, setgithub] = useState('')
  const [social_link, setsocial_link] = useState('')

  // 获取资料
  const getProfile = () => {
    getProfileList().then((res) => {
      if (res) {
        setprofile(res)
        settitle(res.attributes.title)
        setgithub(res.attributes.github)
        setsocial_link(res.attributes.social_link)
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
        title,
        github,
        social_link,
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
      onGetUserInfo={(e) => {
        setcurUserInfo(e)
      }}
    >
      <p className="_admin_body_section_title">基本设置</p>
      {curUserInfo && curUserInfo.priority === 100 && profile ? (
        <div className={styles.setting}>
          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <div className={styles.item}>
              <div className={styles.item_title}>Logo</div>
              <div className={styles.item_right}>
                <a
                  onClick={() => {
                    setmodalShow(true)
                  }}
                >
                  {/* {profile.attributes.logo ? (
                    <div className={styles.item_right_logo} style={{ backgroundImage: `url(${profile.attributes.logo})` }}></div>
                  ) : (
                    '上传'
                  )} */}
                  {profile.attributes.logo && (
                    <div className={styles.item_right_logo} style={{ backgroundImage: `url(${profile.attributes.logo})` }}></div>
                  )}
                  上传
                </a>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_title}>标题</div>
              <div className={styles.item_right}>
                <input
                  placeholder="请输入标题"
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_title}>Github</div>
              <div className={styles.item_right}>
                <input
                  placeholder="请输入url"
                  value={github}
                  onChange={(e) => {
                    setgithub(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_title}>友情链接</div>
              <div className={styles.item_right}>
                <input
                  placeholder="请输入url"
                  value={social_link}
                  onChange={(e) => {
                    setsocial_link(e.target.value)
                  }}
                />
              </div>
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
          <Modal
            width={900}
            visible={modalShow}
            onCancel={() => {
              setmodalShow(false)
            }}
            onOk={() => {
              handleCreate()
            }}
            okText="保存"
            cancelText="取消"
            bodyStyle={{ padding: 0 }}
            footer={null}
          >
            {modalShow && (
              <Upload
                onChoose={async ({ url }) => {
                  // 更新logo
                  updateProfile({
                    profileItem: profile,
                    params: {
                      logo: url,
                    },
                  }).then(() => {
                    setmodalShow(false)
                    getProfile()
                    notification.success({
                      message: '更新成功',
                      // description: "请输入用户名、密码",
                    })
                  })
                }}
              />
            )}
          </Modal>
        </div>
      ) : (
        <div className="_admin_body_section_block">暂无权限，请联系管理员开通～</div>
      )}
    </Layout>
  )
}

export default AdminHome
