/*
 * @Description: page name
 * @Author: bangdong.chen
 * @Date: 2020-08-06 09:01:26
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-08-06 09:23:41
 */

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Particles from 'react-particles-js'
import React, { useState } from 'react'
import AV from 'leancloud-storage'
import { Spin, Switch, notification } from 'antd'

import styles from './index.module.scss'
import leanerrors from 'src/lib/leancloud_error_code.json'

function Components(props) {
  const type = props.type || 'text' // switch, text

  return (
    <div className={styles.item} style={props.style || {}}>
      <div className={styles.item_title}>{props.title}</div>
      <div className={styles.item_right}>
        {type === 'text' ? (
          <input
            placeholder={props.placeholder || '请输入'}
            value={props.value || ''}
            onChange={(e) => {
              props.onChange(e.target.value)
            }}
          />
        ) : (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            checked={props.value}
            onChange={(e) => {
              props.onChange(e)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Components
