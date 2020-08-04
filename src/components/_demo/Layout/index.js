import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { getMenusList } from 'src/service/menu'
import { getProfileList } from 'src/service/profile'

import styles from './index.module.scss'
import Nav from '../Nav'

function Components(props) {
  const [menus, setmenus] = useState(null)
  const [profile, setprofile] = useState(null)

  const handleInit = async () => {
    // 获取菜单
    localStorage.getItem('CMS_Menus') && setmenus(JSON.parse(localStorage.getItem('CMS_Menus')))
    const resMenu = await getMenusList()
    setmenus(resMenu.attributes.value)
    localStorage.setItem('CMS_Menus', JSON.stringify(resMenu.attributes.value))

    // 获取品牌资料
    localStorage.getItem('CMS_Profile') && setprofile(JSON.parse(localStorage.getItem('CMS_Profile')))
    const resProfile = await getProfileList()
    setprofile(JSON.parse(JSON.stringify(resProfile)))
    localStorage.setItem('CMS_Profile', JSON.stringify(resProfile))
  }

  useEffect(() => {
    handleInit()
  }, [])

  return (
    <div className={styles.container}>
      {menus && profile && <Nav menus={menus} profile={profile} />}
      {props.children}
    </div>
  )
}

export default Components
