import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Tree, Button, notification, Input, Modal } from 'antd'
import { PlusOutlined, DownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from "uuid";
import shortid from 'shortid'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import defaultMenu, { handleformatData } from 'src/lib/defaultMenu'
import { createMenus, updateMenus, getMenusList } from 'src/service/menu'

function AdminHome() {
  const [curMenuObj, setcurMenuObj] = useState(null)
  const [curMenu, setcurMenu] = useState([])
  const [level1Show, setlevel1Show] = useState(false)
  const [level1Title, setlevel1Title] = useState('')
  const [selectedMenu, setselectedMenu] = useState(null)
  const [updateShow, setupdateShow] = useState(false)
  const [curUserInfo, setcurUserInfo] = useState(null)

  const onSelect = (select, info) => {
    const obj = {
      title: info.node.title,
      key: info.node.key,
    }
    setselectedMenu(obj)
    setupdateShow(true)
  }

  const updateFunction = async (newValue) => {
    if (curMenuObj) {
      await updateMenus({
        menuItem: curMenuObj,
        params: {
          value: newValue,
        },
      })
      setupdateShow(false)
      handleGetMenu()
      notification.success({
        message: '更新成功',
        // description: "请输入用户名、密码",
      })
    }
  }

  const onDrop = (info) => {
    const result = handleformatData(info, curMenu)
    updateFunction(result)
  }

  const createLevel1 = async () => {
    if (!level1Title) {
      notification.error({
        message: '请输入标题',
        // description: "请输入用户名、密码",
      })
      return
    }
    const newObj = {
      title: level1Title,
      key: shortid.generate(),
    }
    curMenu.push(newObj)
    await updateFunction(curMenu)
    setlevel1Show(false)
  }

  const handleUpdate = () => {
    const newcurMenu = curMenu.map((obj1) => {
      if (obj1.key === selectedMenu.key) {
        obj1.title = selectedMenu.title
      }

      if (obj1.children) {
        obj1.children.map((obj2) => {
          if (obj2.key === selectedMenu.key) {
            obj2.title = selectedMenu.title
          }
          return obj2
        })
      }
      return obj1
    })
    updateFunction(newcurMenu)
  }

  const handleGetMenu = async () => {
    // 获取菜单
    const res = await getMenusList()
    if (res) {
      setcurMenu(res.attributes.value)
      setcurMenuObj(res)
    } else {
      // 创建默认菜单
      const resMenu = await createMenus()
      setcurMenu(defaultMenu)
      setcurMenuObj(resMenu)
    }
  }

  useEffect(() => {
    handleGetMenu()
  }, [])

  return (
    <Layout
      onChange={(params) => {
        setcurUserInfo(params.userinfo)
      }}
    >
      {curUserInfo && curUserInfo.toJSON().priority === 100 ? (
        <div className={styles.menus}>
          <p className="_admin_body_section_title">自定义菜单</p>
          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <div className={styles.block_waring}>
              <InfoCircleOutlined style={{ color: 'RGBA(53, 90, 207, 1.00)', fontSize: 20 }} />
              <p>拖拽目录进行排序，和层级管理</p>
            </div>
            <Tree
              showLine
              // switcherIcon={<DownOutlined />}
              defaultExpandAll
              onSelect={onSelect}
              onDrop={onDrop}
              draggable
              // blockNode
              treeData={curMenu}
            />
          </div>
          <div>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size={14}
              style={{ marginRight: 15 }}
              onClick={() => {
                setlevel1Show(true)
              }}
            >
              一级目录
            </Button>
            {/* <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={14}
          style={{ marginRight: 15 }}
        >
          二级目录
        </Button> */}
          </div>
          <Modal
            title="一级目录"
            visible={level1Show}
            onCancel={() => {
              setlevel1Show(false)
            }}
            onOk={() => {
              createLevel1()
            }}
          >
            <Input
              placeholder="标题"
              onChange={(e) => {
                setlevel1Title(e.target.value)
              }}
            />
          </Modal>
          <Modal
            title="更新"
            visible={updateShow}
            onCancel={() => {
              setupdateShow(false)
            }}
            onOk={() => {
              handleUpdate()
            }}
            okText="创建"
            cancelText="取消"
          >
            <Input
              placeholder="标题"
              value={selectedMenu ? selectedMenu.title : ''}
              onChange={(e) => {
                setselectedMenu({
                  title: e.target.value,
                  key: selectedMenu.key,
                })
              }}
            />
          </Modal>
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
