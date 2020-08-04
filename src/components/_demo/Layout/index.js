import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'

import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Nav from '../Nav'

function Components(props) {
  const [modalShow, setmodalShow] = useState(false)

  useEffect(() => {}, [])

  return (
    <div className={styles.container}>
      <Nav />
      {props.children}
    </div>
  )
}

export default Components
