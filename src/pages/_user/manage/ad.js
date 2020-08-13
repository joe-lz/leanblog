import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Switch, notification, Radio, Popover, Modal, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import AdForm from 'src/components/_user/AdForm'
import { createProfile, getProfileList, updateProfile } from 'src/service/profile'
import defaultAd from 'src/lib/defaultAd'

function AdminHome(props) {
  const [curUserInfo, setcurUserInfo] = useState(null)
  const [profile, setprofile] = useState(null)
  const [adValues, setadValues] = useState([])

  // 获取资料
  const getProfile = () => {
    getProfileList().then((res) => {
      if (res) {
        setprofile(res)
        if (res.attributes.ads && res.attributes.ads.length > 0) {
          setadValues(res.attributes.ads)
        } else {
          setadValues(defaultAd)
        }
      } else {
        createProfile().then((resCreate) => {
          setprofile(resCreate)
          if (resCreate.attributes.ads && resCreate.attributes.ads.length > 0) {
            setadValues(res.attributes.ads)
          } else {
            setadValues(defaultAd)
          }
        })
      }
    })
  }

  const updateAdArr = ({ index, value }) => {
    let newArr = adValues
    newArr[index] = value
    setadValues(newArr)
  }

  // 更新profile
  const handlesubmit = async () => {
    await updateProfile({
      profileItem: profile,
      params: {
        ads: adValues,
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
      <p className="_admin_body_section_title">广告设置</p>
      {curUserInfo && curUserInfo.toJSON().priority === 100 && profile ? (
        <div className={styles.ad}>
          {adValues.map((obj, index) => {
            return (
              <AdForm
                key={obj.key}
                id={obj.key}
                show={obj.show}
                label={obj.label}
                title={obj.title}
                adUrl={obj.adUrl}
                imgUrl={obj.imgUrl}
                onChange={(e) => {
                  updateAdArr({
                    index,
                    value: e,
                  })
                }}
              />
            )
          })}
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
