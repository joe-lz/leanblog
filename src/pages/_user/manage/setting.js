import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Switch, notification, Radio, Popover, Modal } from 'antd'
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

  // 获取资料
  const getProfile = () => {
    getProfileList().then((res) => {
      if (res) {
        setprofile(res)
      } else {
        createProfile().then((resCreate) => {
          setprofile(resCreate)
        })
      }
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
                  {profile.attributes.logo && <div className={styles.item_right_logo} style={{ backgroundImage: `url(${profile.attributes.logo})` }}></div>}
                  上传
                </a>
              </div>
            </div>
            {/* <div className={styles.item}>
              <div className={styles.item_title}>名称</div>
              <div className={styles.item_right}></div>
            </div> */}
          </div>
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
