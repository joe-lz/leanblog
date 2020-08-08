import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Tree, Button, notification, Input, Modal, TreeSelect } from 'antd'

import styles from './index.module.scss'
import Upload from 'src/components/_user/Upload'

const { TextArea } = Input

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)
  const [desc, setdesc] = useState('')
  const [imgUrl, setimgUrl] = useState('')
  const [topic, settopic] = useState(null)

  useEffect(() => {}, [])

  return (
    <div className={styles.postEditor}>
      <div className={styles.input}>
        <TextArea
          autoSize
          className={styles.textarea}
          value={desc}
          placeholder="告诉你个小秘密，添加合适话题会被更多人看见哟～"
          maxlength={140}
          onChange={(e) => {
            setdesc(e.target.value)
          }}
        />
        <div className={styles.postEditor_media}>
          {imgUrl && (
            <div className={styles.postEditor_media_img}>
              <i
                className="iconfont icon-close"
                onClick={() => {
                  setimgUrl('')
                }}
              ></i>
              <div
                className={styles.postEditor_media_img_content}
                style={{ backgroundImage: `url(${imgUrl})` }}
                onClick={() => {
                  setmodalShow(true)
                }}
              ></div>
            </div>
          )}
          {topic && <div className={styles.postEditor_media_topic}>{topic}</div>}
        </div>
      </div>
      <div className={styles.postEditor_operation}>
        <div
          className={styles.postEditor_operation_btn}
          onClick={() => {
            setmodalShow(true)
          }}
        >
          <i className="iconfont icon-tupian1" style={{ marginRight: 5 }}></i>
          图片
        </div>
        <div className={styles.postEditor_operation_btn}>
          <i className="iconfont icon-huatifuhao"></i>
          话题
        </div>
      </div>
      <Modal
        width={900}
        visible={modalShow}
        onCancel={() => {
          setmodalShow(false)
        }}
        onOk={() => {}}
        okText="保存"
        cancelText="取消"
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        {modalShow && (
          <Upload
            onChoose={async ({ url }) => {
              setmodalShow(false)
              setimgUrl(url)
            }}
          />
        )}
      </Modal>
    </div>
  )
}

export default Components
