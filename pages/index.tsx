import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { HooksNoSSR, ClassNoSSR } from '../components/no-ssr'
import { useLayoutEffect, useState } from 'react'

const Demo: NextPage = () => {
  return (
    <div className={styles.container}>
      <Comp />
      <HooksNoSSR>
        <Comp />
      </HooksNoSSR>
      <ClassNoSSR>
        <Comp />
      </ClassNoSSR>
    </div>
  )
}

const Comp = () => {
  const [str, setStr] = useState('hello world')
  useLayoutEffect(() => {
    setStr('world hello')
  }, [])
  return (
    <div>{str}</div>
  )
}

export default Demo
