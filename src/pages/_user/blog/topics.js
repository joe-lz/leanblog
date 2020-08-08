import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Modal, Form, Input, Button, Checkbox, notification } from 'antd'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import TopicItem from 'src/components/_user/TopicItem'
import { createTopics, getTopicList, updateTopic } from 'src/service/topics'

function AdminHome() {
  const [modalShow, setmodalShow] = useState(false)
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [list, setlist] = useState([])
  const [status, setstatus] = useState(1)

  const handleCreate = async () => {
    if (list.length > 20) {
      notification.error({
        message: '话题不能超过20个',
        // description: "请输入用户名、密码",
      })
      return
    }
    if (!title) {
      notification.error({
        message: '请输入标题',
        // description: "请输入用户名、密码",
      })
      return
    }
    await createTopics({ title, desc })
    setmodalShow(false)
    getlist({ status })
    notification.success({
      message: '操作成功',
      // description: "请输入用户名、密码",
    })
  }

  const getlist = async (params = {}) => {
    const res = await getTopicList(params)
    setlist(res)
  }

  const handleNavChange = async (params) => {
    setstatus(params.status)
  }

  useEffect(() => {
    getlist({ status })
  }, [status])

  return (
    <Layout>
      <p className="_admin_body_section_title">话题设置</p>
      <div className={styles.topics}>
        <div className="_admin_body_section_block">
          <div className="_admin_body_section_block_nav">
            <span
              className={status === 1 ? '_admin_body_section_block_nav_item_active' : '_admin_body_section_block_nav_item'}
              onClick={() => {
                handleNavChange({ status: 1 })
              }}
            >
              未上线
            </span>
            <span
              className={status === 2 ? '_admin_body_section_block_nav_item_active' : '_admin_body_section_block_nav_item'}
              onClick={() => {
                handleNavChange({ status: 2 })
              }}
            >
              已上线
            </span>
          </div>
        </div>
        {list && list.length > 0 && (
          <div className="_admin_body_section_block" style={{ padding: 30 }}>
            <div className={styles.list}>
              {list.map((obj) => {
                return (
                  <TopicItem
                    key={obj.id}
                    item={obj}
                    onChange={() => {
                      console.log('cd');
                      getlist({ status })
                    }}
                  />
                )
              })}
            </div>
          </div>
        )}
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setmodalShow(true)
          }}
        >
          + 新建话题
        </Button>
        <Modal
          title="创建话题"
          width={500}
          visible={modalShow}
          onCancel={() => {
            setmodalShow(false)
          }}
          onOk={() => {
            handleCreate()
          }}
          okText="保存"
          cancelText="取消"
        >
          <div>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={() => {}}
              onFinishFailed={() => {}}
            >
              <Form.Item label="话题名称" name="title" rules={[{ required: true, message: '请输入话题名称' }]}>
                <Input
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="话题描述" name="desc" rules={[{ required: false, message: '请输入话题描述' }]}>
                <Input
                  value={desc}
                  onChange={(e) => {
                    setdesc(e.target.value)
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}

export default AdminHome
