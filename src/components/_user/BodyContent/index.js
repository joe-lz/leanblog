import Head from 'next/head'
import Link from 'next/link'
import Particles from 'react-particles-js'
import React, { useState, useEffect } from 'react'
import AV from 'leancloud-storage'
import { Spin, Alert, notification } from 'antd'

import styles from './index.module.scss'
import leanerrors from 'src/lib/leancloud_error_code.json'
import Sidebar from '../Sidebar'
import { getMyUserInfo } from 'src/service/user'

function Components(props) {
  const [priority, setpriority] = useState(0)
  const [curUserInfo, setcurUserInfo] = useState(0)

  useEffect(() => {
    // 获取我的授权状态
    const fetchData = async () => {
      const res = await getMyUserInfo()
      if (res) {
        const userinfo = JSON.parse(JSON.stringify(res))
        props.onGetUserInfo && props.onGetUserInfo(userinfo)
        setcurUserInfo(userinfo)
        setpriority(userinfo.priority || 1)
      } else {
        // 创建userinfo
        const userinfo = new AV.Object('CMS_UserInfo')
        userinfo.set('user', AV.User.current())
        userinfo.set('priority', 1) // 权限等级 默认：1 未授权
        // 将对象保存到云端
        userinfo.save().then(
          (todo) => {
            // 成功保存之后，执行其他逻辑
          },
          (error) => {
            // 异常处理
          }
        )
      }
    }
    fetchData()
  }, [])

  return (
    <div className={!props.hideSidebar ? styles.container : styles.width100vw}>
      {[100, 99].includes(priority) && (
        <>
          {!props.hideSidebar && <Sidebar userinfo={curUserInfo}></Sidebar>}
          <div className={styles.content}>{props.children}</div>
        </>
      )}
      {priority === 1 && (
        <>
          <div className={styles.notAuthed}>
            <i className="iconfont icon-yonghushouquan"></i>
            <p>当前用户没有授权哦</p>
            <p>快快联系管理员，开通权限吧～</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Components
