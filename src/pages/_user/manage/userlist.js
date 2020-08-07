import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space, Switch, notification, Radio, Popover } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'
import priorityArr from 'src/lib/priority'

function AdminHome(props) {
  const [userlist, setuserlist] = useState([])
  const [curUserInfo, setcurUserInfo] = useState(null)

  useEffect(() => {
    // 获取我的授权状态
    const query = new AV.Query('CMS_UserInfo')
    // query.equalTo("user", curUser);
    query.include('user')
    query.limit(50)
    query.descending('updatedAt')
    query
      .find()
      .then((res) => {
        setuserlist(res)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  const updateUserInfo = ({ userinfo, params }) => {
    Object.keys(params).map((keyname) => {
      userinfo.set(keyname, params[keyname])
      return keyname
    })
    userinfo.save().then(
      (todo) => {
        // 成功保存之后，执行其他逻辑
        notification.success({
          message: '操作成功',
          description: '权限更新成功～',
        })
      },
      (error) => {
        // 异常处理
        notification.error({
          message: '操作失败',
          description: '权限更新失败，请稍后重试～',
        })
      }
    )
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (res, item) => {
        return <div>{item.attributes.user.attributes.username}</div>
      },
    },
    {
      title: (
        <div>
          权限设置
          <Popover
            placement="rightTop"
            content={
              <div>
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: 'key',
                      dataIndex: 'value',
                      key: 'value',
                      render: (res, item) => {
                        return item.value
                      },
                    },
                    {
                      title: '名称',
                      dataIndex: 'label',
                      key: 'label',
                      render: (res, item) => {
                        return item.label
                      },
                    },
                    {
                      title: '描述',
                      dataIndex: 'desc',
                      key: 'desc',
                      render: (res, item) => {
                        return item.desc
                      },
                    },
                  ]}
                  dataSource={priorityArr}
                  rowKey={(record) => record.id}
                  style={{ width: '100%' }}
                />
              </div>
            }
            title="权限说明"
          >
            <QuestionCircleOutlined style={{ marginLeft: 5 }} />
          </Popover>
        </div>
      ),
      dataIndex: 'prioroty',
      key: 'prioroty',
      render: (res, item) => (
        <div>
          <Radio.Group
            defaultValue={item.attributes.priority}
            buttonStyle="solid"
            style={{}}
            onChange={(e) => {
              updateUserInfo({
                userinfo: item,
                params: {
                  priority: e.target.value,
                },
              })
            }}
          >
            {priorityArr.map((obj) => {
              return (
                <Radio.Button value={obj.value} key={`${obj.value}_${obj.labbel}`} checked={obj.value === item.attributes.priority}>
                  {obj.label}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </div>
      ),
    },
  ]

  return (
    <Layout
      onGetUserInfo={(e) => {
        setcurUserInfo(e)
      }}
    >
      <p className="_admin_body_section_title">用户管理</p>
      {curUserInfo && curUserInfo.priority === 100 ? (
        <div className="_admin_body_section_block">
          <Table columns={columns} dataSource={userlist} rowKey={(record) => record.id} style={{ width: '100%' }} />
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
