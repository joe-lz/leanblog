import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'

function Components(props) {
  const [finalminLevel, setfinalminLevel] = useState(10)

  useEffect(() => {
    const { nav } = props
    let minLevel = 10
    nav.map((obj) => {
      console.log(obj.level, minLevel)
      if (obj.level < minLevel) {
        minLevel = obj.level
        return obj
      }
    })
    setfinalminLevel(minLevel)
  }, [JSON.stringify(props.nav)])

  const { nav } = props

  return (
    <>
      {nav && nav.length > 0 && (
        <div className={styles.container}>
          {nav.map((obj, index) => {
            return (
              <a
                className={obj.level > finalminLevel ? styles.item_mini : styles.item}
                key={`${index + 1}`}
                style={obj.level > finalminLevel ? { paddingLeft: 20 * (obj.level - finalminLevel) } : { fontWeight: 'bold' }}
              >
                <span className={styles.text}>{obj.text}</span>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Components
