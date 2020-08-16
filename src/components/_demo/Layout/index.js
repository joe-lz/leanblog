import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { getMenusList } from 'src/service/menu'
import { getProfileList } from 'src/service/profile'
import { getMyUserInfo } from 'src/service/user'

import styles from './index.module.scss'
import Nav from '../Nav'

Components.defaultProps = {
  onChange: () => {},
}
function Components(props) {
  const [menus, setmenus] = useState(null)
  const [profile, setprofile] = useState(null)
  const [curUserInfo, setcurUserInfo] = useState(null)

  const handleInit = async () => {
    // 获取菜单
    // const local_CMS_Menus = localStorage.getItem('CMS_Menus')
    // local_CMS_Menus && setmenus(JSON.parse(local_CMS_Menus))
    // const resMenu = await getMenusList()
    // if (resMenu) {
    //   setmenus(resMenu.attributes.value)
    //   localStorage.setItem('CMS_Menus', JSON.stringify(resMenu.attributes.value))
    // }

    // 获取品牌资料
    // const local_CMS_Profile = localStorage.getItem('CMS_Profile')
    // local_CMS_Profile && setprofile(JSON.parse(local_CMS_Profile))
    // const resProfile = await getProfileList()
    // if (resProfile) {
    //   setprofile(JSON.parse(JSON.stringify(resProfile)))
    //   localStorage.setItem('CMS_Profile', JSON.stringify(resProfile))
    // }

    // 获取用户信息
    // const local_CMS_UserInfo = localStorage.getItem('CMS_UserInfo')
    // local_CMS_UserInfo && setcurUserInfo(JSON.parse(local_CMS_UserInfo))
    // const resUserInfo = await getMyUserInfo()
    // if (resUserInfo) {
    //   setcurUserInfo(JSON.parse(JSON.stringify(resUserInfo)))
    //   localStorage.setItem('CMS_UserInfo', JSON.stringify(resUserInfo))
    // }
    try {
      await getData('CMS_Menus', getMenusList, setmenus)
      await getData('CMS_Profile', getProfileList, setprofile)
      await getData('CMS_UserInfo', getMyUserInfo, setcurUserInfo)
    } catch (error) {
      console.error(error)
    }
  }

  const getData = async (keyname, func, setFunc) => {
    // 获取菜单
    const local_data = localStorage.getItem(keyname)
    const local_time = Number(localStorage.getItem(`${keyname}_time`))
    local_data && setFunc(JSON.parse(local_data))
    if (local_data && local_time + 5 * 60 * 1000 > Date.now()) {
      setFunc(JSON.parse(local_data))
    } else {
      const res = await func()
      if (res) {
        setFunc(JSON.parse(JSON.stringify(res)))
        localStorage.setItem(keyname, JSON.stringify(res))
        localStorage.setItem(`${keyname}_time`, Date.now())
      }
    }
  }

  useEffect(() => {
    handleInit()
  }, [])

  useEffect(() => {
    props.onChange &&
      props.onChange({
        menus,
        profile,
        userinfo: curUserInfo,
      })
  }, [menus, profile, curUserInfo])

  return (
    <div className={styles.container}>
      {profile && profile.github ? (
        <a target="_blank" className="github-corner" aria-label="View source on Github" href={profile.github}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 250 250"
            style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }}
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style={{ transformOrigin: '130px 106px' }}
              className="octo-arm"
            ></path>
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            ></path>
          </svg>
        </a>
      ) : null}
      {/* {menus && profile && <Nav menus={menus} profile={profile} userinfo={curUserInfo} />} */}
      {menus && profile && <Nav menus={menus.value} profile={profile} userinfo={curUserInfo} />}
      <div className={styles.body}>{props.children}</div>
      {profile && (
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            <img src={profile.logo} alt="" className={styles.logo} />
            <p className={styles.copyright}>{profile.copyright}</p>
          </div>
          <div className={styles.footer_powerby}>
            <p className={styles.title}>
              <i className="iconfont icon-github"></i>
              {`Powered By `}
              <a href={process.env.brandLink} className="link" target='_blank'>
                「{process.env.brandName}」
              </a>
              .
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Components
