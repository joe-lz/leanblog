import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import styles from './index.module.scss'

function Components(props) {
  const userinfoNew = JSON.parse(JSON.stringify(props.userinfo))
  return (
    <>
      {props.userinfo && (
        <div className={styles.userinfo}>
          <a href={`/_demo/user/${userinfoNew.objectId}`} target="_blank" style={{ display: 'block' }}>
            <div className={styles.userinfo_content}>
              <div className={styles.avatar} style={{ backgroundImage: `url(${userinfoNew.avatar})` }}></div>
              <div className={styles.userinfo_info}>
                <p className={styles.nickname}>{userinfoNew.nickname}</p>
                <p className={styles.about}>
                  {userinfoNew.position}
                  {userinfoNew.co_name ? `@${userinfoNew.co_name}` : ''}
                  {props.time ? `・${props.time}` : ''}
                </p>
              </div>
            </div>
          </a>
          <div className={styles.userinfo_follow}>
            <Button type='primary'>关注</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Components
