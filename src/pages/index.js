import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'

export default function Home() {
  useEffect(() => {
    window.location.href = '/_demo/home'
    console.error('cd')
  }, [])
  return <div className={styles.container}></div>
}
